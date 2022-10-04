import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import Layout, { siteTtile } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thunbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData
    }
  }
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのProps
//     }
//   }
// }

export default function Home({allPostsData}) {
  return <Layout home>
    <Head>
      <title>{siteTtile}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>私はNext.jsエンジニアです/好きなフレームワークはNext.jsです</p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>🗒エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={thumbnail} className={styles.thumbnailImage} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyles.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </article>
        ))}

      </div>
    </section>

  </Layout>
}
