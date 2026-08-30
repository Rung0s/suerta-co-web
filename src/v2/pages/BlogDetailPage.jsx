import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Item } from '../primitives';
import V2Layout from '../shell/V2Layout';
import Prose from './Prose';
import NotFoundPage from './NotFoundPage';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { articleSchema, breadcrumb, faqPage } from '../seo/Seo';
import { postById, postsFor, readingMinutes } from '../data/content';

/* Tek yazi. Altinda ayni etiketten iki yazi daha duruyor: okuma bitince
   sayfa ziyaretciyi bosluga birakmasin, arama motoru da yazilarin
   birbirine bagli oldugunu gorsun. */
export default function BlogDetailPage() {
  const c = useCopy();
  const { lang } = useLang();
  const { id } = useParams();
  const post = postById(lang, id);

  if (!post) return <NotFoundPage />;

  const related = postsFor(lang)
    .filter((item) => item.id !== post.id && item.tag === post.tag)
    .slice(0, 2);

  const url = pathFor('blogItem', lang, { id: post.id });

  return (
    <V2Layout>
      <Seo
        title={post.title}
        description={post.desc}
        type="article"
        jsonLd={[
          articleSchema(post, url, lang),
          faqPage(post.faqs),
          breadcrumb([
            { name: c.nav.home, path: pathFor('home', lang) },
            { name: c.nav.links.find((link) => link.key === 'blog').label, path: pathFor('blog', lang) },
            { name: post.title, path: url },
          ]),
        ]}
      />

      <header className="v2-section v2-pagehead" id="top">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-shell v2-shell--narrow">
          <Reveal className="v2-pagehead__inner">
            <Item>
              <Link className="v2-back" to={pathFor('blog', lang)}>
                {c.pages.blog.back}
              </Link>
            </Item>
            <Item>
              <span className="v2-label">{post.tag}</span>
            </Item>
            <Item as="h1" className="v2-title v2-post__head">
              {post.title}
            </Item>
            <Item as="p" className="v2-lead">
              {post.desc}
            </Item>
            <Item className="v2-post__byline">
              <span>{post.date}</span>
              <span>·</span>
              <span>
                {readingMinutes(post)} {c.pages.blog.minutes}
              </span>
            </Item>
            {!post.translated && (
              <Item>
                <span className="v2-note">{c.pages.blog.untranslated}</span>
              </Item>
            )}
          </Reveal>
        </div>
      </header>

      <section className="v2-section">
        <div className="v2-shell v2-shell--narrow">
          <Reveal>
            <Item>
              <Prose text={post.content} />
            </Item>
          </Reveal>
        </div>
      </section>

      {post.faqs?.length > 0 && (
        <section className="v2-section" id="sss">
          <div className="v2-shell v2-shell--narrow">
            <Reveal className="v2-faq">
              {post.faqs.map((faq) => (
                <Item key={faq.question} as="details" className="v2-faq__item">
                  <summary className="v2-faq__q">
                    {faq.question}
                    <span className="v2-faq__sign" aria-hidden="true" />
                  </summary>
                  <p className="v2-faq__a">{faq.answer}</p>
                </Item>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="v2-section">
          <div className="v2-shell v2-shell--narrow">
            <Reveal>
              <Item className="v2-section__head">
                <h2 className="v2-title">{c.pages.blog.related}</h2>
              </Item>
            </Reveal>

            <Reveal className="v2-posts">
              {related.map((item) => (
                <Item key={item.id}>
                  <Link className="v2-post" to={pathFor('blogItem', lang, { id: item.id })}>
                    <span className="v2-post__meta">
                      <span className="v2-post__tag">{item.tag}</span>
                      <span className="v2-post__time">
                        {readingMinutes(item)} {c.pages.blog.minutes}
                      </span>
                    </span>
                    <span className="v2-post__title">{item.title}</span>
                    <span className="v2-post__go">{c.pages.blog.readMore} →</span>
                  </Link>
                </Item>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <section className="v2-section v2-svc-cta">
        <div className="v2-shell">
          <Reveal className="v2-svc-cta__box">
            <Item as="h2" className="v2-title">
              {c.contact.heading}
            </Item>
            <Item>
              <Link className="v2-btn v2-btn--primary" to={pathFor('contact', lang)}>
                {c.hero.ctaPrimary}
              </Link>
            </Item>
          </Reveal>
        </div>
      </section>
    </V2Layout>
  );
}
