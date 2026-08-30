import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Item } from '../primitives';
import V2Layout from '../shell/V2Layout';
import PageHead from './PageHead';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { breadcrumb } from '../seo/Seo';
import { postsFor, readingMinutes } from '../data/content';

/* Yazi listesi.
   Etiketler yazilardan turuyor: elle yazilan bir liste, yeni bir yazi
   baska bir etiketle geldiginde sessizce yanlis oluyor. */
export default function BlogPage() {
  const c = useCopy();
  const { lang } = useLang();
  const posts = postsFor(lang);
  const [tag, setTag] = useState(null);

  const tags = useMemo(
    () => [...new Set(posts.map((post) => post.tag))].filter(Boolean),
    [posts]
  );

  const shown = tag ? posts.filter((post) => post.tag === tag) : posts;

  return (
    <V2Layout>
      <Seo
        title={c.meta.blog.title}
        description={c.meta.blog.description}
        jsonLd={breadcrumb([
          { name: c.nav.home, path: pathFor('home', lang) },
          { name: c.nav.links.find((link) => link.key === 'blog').label, path: pathFor('blog', lang) },
        ])}
      />

      <PageHead
        label={c.nav.links.find((link) => link.key === 'blog').label}
        lead={c.pages.blog.lead}
        tail={c.pages.blog.tail}
        intro={c.pages.blog.intro}
      />

      <section className="v2-section" id="blog">
        <div className="v2-shell">
          <Reveal className="v2-filters">
            <Item>
              <button
                type="button"
                className={`v2-filter${tag === null ? ' is-on' : ''}`}
                onClick={() => setTag(null)}
              >
                {c.pages.blog.allTags}
              </button>
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`v2-filter${tag === item ? ' is-on' : ''}`}
                  onClick={() => setTag(item)}
                >
                  {item}
                </button>
              ))}
            </Item>
          </Reveal>

          <Reveal className="v2-posts">
            {shown.map((post) => (
              <Item key={post.id}>
                <Link className="v2-post" to={pathFor('blogItem', lang, { id: post.id })}>
                  <span className="v2-post__meta">
                    <span className="v2-post__tag">{post.tag}</span>
                    <span className="v2-post__time">
                      {readingMinutes(post)} {c.pages.blog.minutes}
                    </span>
                  </span>
                  <span className="v2-post__title">{post.title}</span>
                  <span className="v2-post__desc">{post.desc}</span>
                  <span className="v2-post__go">{c.pages.blog.readMore} →</span>
                </Link>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>
    </V2Layout>
  );
}
