import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import utilStyle from '../styles/utils.module.css'
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
  return <Layout>
    <section>
      <p className={utilStyle.headingMd}>私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです</p>
    </section>
    <section>
      <h2>🗒エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={thumbnail} className={styles.thumbnailImage} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}

      </div>
    </section>

  </Layout>
}
