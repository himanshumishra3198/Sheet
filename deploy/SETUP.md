# Hosting Sheet on the rankarenas EC2 box

Sheet runs as its own compose project in `/home/ubuntu/sheet`, next to
rankarena in `/home/ubuntu/rankarena`. It shares three things with rankarena:

- **nginx** — rankarena's proxy (ports 80/443) routes Sheet's domain to the
  `sheet` container over the `rankarena_default` docker network.
- **postgres** — Sheet has its own `sheet` database and role inside
  rankarena's postgres container.
- **certbot** — rankarena's certbot container also renews Sheet's cert.

```
internet ─► rankarena proxy (nginx :443)
              ├─ rankarenas.com, admin., api.  ─► rankarena containers
              └─ $DOMAIN                       ─► sheet:3001 ─► postgres/sheet
```

Everything below is one-time. After it, every push to `main` builds the image,
pushes it to ECR and restarts the container (`.github/workflows/deploy.yml`).
Migrations and the problem list are applied on container start.

Throughout, set the domain once in your shell:

```sh
DOMAIN=hm0.org
```

## 1. DNS

Point `$DOMAIN` (and `www.$DOMAIN`, if wanted) at the box with an A record to
the instance's public IP. Make sure that IP is an Elastic IP, or it changes
the next time the instance stops.

## 2. Server prep (ssh ubuntu@<ec2>)

Add swap. The box has 2GB RAM and none, and now runs two apps:

```sh
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Create the database and role inside rankarena's postgres:

```sh
SHEET_DB_PASSWORD=$(openssl rand -hex 24)
docker exec -i rankarena-postgres-1 sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' <<SQL
CREATE ROLE sheet LOGIN PASSWORD '$SHEET_DB_PASSWORD';
CREATE DATABASE sheet OWNER sheet;
SQL
```

Create the env file (`deploy/.env.example` documents every key):

```sh
mkdir -p ~/sheet && cd ~/sheet
cat > .env <<EOF
SHEET_DB_NAME=sheet
SHEET_DB_USER=sheet
SHEET_DB_PASSWORD=$SHEET_DB_PASSWORD
AUTH_URL=https://$DOMAIN
AUTH_SECRET=$(openssl rand -base64 33)
AUTH_GOOGLE_ID=<google client id>
AUTH_GOOGLE_SECRET=<google client secret>
EOF
chmod 600 .env
```

## 3. TLS certificate

Rankarena's port-80 server already answers ACME challenges for any host, so
issue the cert through its certbot container. This must succeed **before**
the nginx change in step 6 is deployed: nginx refuses to start if a
referenced certificate is missing, which would take rankarenas down too.

```sh
cd ~/rankarena
docker compose -f docker-compose.prod.yml run --rm --entrypoint certbot certbot \
  certonly --webroot -w /var/www/certbot \
  -d $DOMAIN -d www.$DOMAIN \
  --email <you@example.com> --agree-tos --no-eff-email
```

Renewal is automatic: the running certbot container renews every cert it has.

## 4. AWS (from a machine with admin credentials)

```sh
aws ecr create-repository --repository-name sheet-app --region us-east-1
aws ecr put-lifecycle-policy --repository-name sheet-app --region us-east-1 \
  --lifecycle-policy-text file://<rankarena>/scripts/ecr-lifecycle-policy.json
```

The CI IAM user must be allowed to push to `sheet-app`. If its policy is
scoped to the `rankarena-*` repositories, add this one.

## 5. GitHub secrets (Sheet repo → Settings → Secrets → Actions)

| Secret                  | Value                                       |
| ----------------------- | ------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | the CI IAM user's key, same as rankarena's  |
| `AWS_SECRET_ACCESS_KEY` | its secret                                  |
| `EC2_HOST`              | the instance's public IP / hostname         |
| `EC2_SSH_KEY`           | private key for `ubuntu@` on the instance   |

The old secrets (`DOCKERHUB_*`, `SSH_PRIVATE_KEY`, `DATABASE_URL`, `AUTH_*`)
are no longer used and can be deleted. App config lives in the server's
`~/sheet/.env` instead.

In Google Cloud Console, add `https://$DOMAIN/api/auth/callback/google` to the
OAuth client's authorized redirect URIs.

Then push to `main` (or run the workflow by hand). Check it came up:

```sh
docker logs sheet-sheet-1 | tail     # "All migrations ... applied", "Ready"
```

## 6. Route the domain in rankarena's nginx

The `hm0.org` server blocks live in rankarena's `nginx/nginx.conf`. Commit,
and push. Rankarena's deploy copies the file to the box and restarts the
proxy. Edit the repo, not the box: every rankarena deploy overwrites
the server's copy.
