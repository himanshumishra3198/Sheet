import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { TopicView } from "@/components/TopicView";
import { getTopic, topics, type Topic } from "@/lib/problems";
import { SITE_NAME, SITE_URL, socialMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

function describe(topic: Topic) {
  const { total, easy, medium, hard } = topic.counts;
  const parts = [
    easy && `${easy} easy`,
    medium && `${medium} medium`,
    hard && `${hard} hard`,
  ].filter(Boolean);
  return `${total} ${topic.noun.toLowerCase()} problems (${parts.join(", ")}) with LeetCode and GeeksforGeeks links.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  if (!topic) return {};
  const title = `${topic.noun} Problems: ${topic.counts.total} DSA Questions`;
  // Search results show about 160 characters.
  const withCount = `${topic.summary} ${topic.counts.total} problems with LeetCode and GFG links.`;
  const description = withCount.length <= 160 ? withCount : topic.summary;
  return {
    title,
    description,
    ...socialMetadata({
      title: `${title} | ${SITE_NAME}`,
      description,
      path: `/topics/${topic.slug}`,
    }),
  };
}

export default async function TopicPage({ params }: Props) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();
  const prev = topics[topic.number - 2];
  const next = topics[topic.number];

  return (
    <main id="main" className="mx-auto max-w-5xl px-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: topic.name,
              item: `${SITE_URL}/topics/${topic.slug}`,
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-fg">
              {SITE_NAME}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/#topics" className="hover:text-fg">
              Topics
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-fg">
            {topic.name}
          </li>
        </ol>
      </nav>

      <TopicView topic={topic}>
        <div>
          <p className="text-sm font-medium text-accent">
            Topic {topic.number} of {topics.length}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {topic.noun} Problems
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
            {topic.summary}
          </p>
          <p className="mt-3 text-sm text-muted">{describe(topic)}</p>
        </div>
      </TopicView>

      <nav aria-label="More topics" className="mt-10 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/topics/${prev.slug}`}
            className="group rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous topic
            </span>
            <span className="mt-1 block font-medium">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/topics/${next.slug}`}
            className="group rounded-2xl border border-line bg-surface p-4 text-right transition-colors hover:border-accent"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted">
              Next topic <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-medium">{next.name}</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
