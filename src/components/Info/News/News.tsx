import stylles from './News.module.scss'

type PropsType = {
    source: {id: string, name: string},
    description: string,
    url: string,
}

export const NewsItem = ({url, description}: PropsType) => {
    return (
        <div className={stylles.newsItem}>
            <ul className={stylles.list}>
                <li className={stylles.item}>
                    <a className={stylles.link} target='_blank' href={url}>{description}</a>
                </li>
            </ul>
        </div>
    )
}