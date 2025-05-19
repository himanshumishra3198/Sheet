FROM node:23-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Set the DATABASE_URL environment variable (ensure it's passed during build)
ARG DATABASE_URL 
ARG AUTH_GOOGLE_ID 
ARG AUTH_GOOGLE_SECRET 
ARG AUTH_SECRET
ARG AUTH_URL
ARG AUTH_TRUST_HOST

ENV DATABASE_URL=${DATABASE_URL}
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_URL=${AUTH_URL}
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}

RUN npm run db:generate
# RUN npm run db:problems
RUN npm run build

EXPOSE 3001
CMD [ "sh", "-c", "npm run db:generate && npm run db:problems && npm run start" ]

