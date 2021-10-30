import Link from 'next/link'
import s from './Portfolio.module.scss';
import Subtitle from "../../../Subtitle";
import Button from "../../../Button";
import {useState} from "react";
import KeyPoint from "../../../KeyPoint/KeyPoint";
import Paragraph from "../../../Paragraph";
import {svg} from '../../../../data/svg';

const Portfolio = ({data, projects, lang}) => {
    const [active, setActive] = useState(1)

    const Content = (project, i) => {
        const svgTab = project.tech?.split(',')
        const image = (url) => url ? <div key={url} className={s.image} style={{backgroundImage: `url(${url})`}}/> : null
        return (
            <div key={i} className={s.content}>

                <a className={s.link} href={project.url} target={'_blank'}>
                    {svg.link}<Paragraph title>{project.title}</Paragraph>
                </a>

                {project.images.map(img => image(img.url))}

                <div className={s.siteProfile}>
                    <Paragraph wide svgTab={svgTab}>Technologies</Paragraph>
                    {
                        lang === 'eng' ? <>
                                <Paragraph wide p={project.eng.specsOne.p}>{project.eng.specsOne.title}</Paragraph>
                                <Paragraph wide p={project.eng.specsTwo.p}>{project.eng.specsTwo.title}</Paragraph>
                            </> :
                            <>
                                <Paragraph wide p={project.fr.specsOne.p}>{project.fr.specsOne.title}</Paragraph>
                                <Paragraph wide p={project.fr.specsTwo.p}>{project.fr.specsTwo.title}</Paragraph>
                            </>
                    }
                </div>
            </div>
        )
    }


    return (
        <div>
            <Subtitle p={data.p} cursor>{data.subtitle}</Subtitle>
            <div className={s.btn}>
                <Link href={'/contact'}>
                   <a><Button black>CONTACT</Button></a>
                </Link>
            </div>
            <div className={s.row}>
                <div className={s.col}>
                    <KeyPoint bar>{data.keyPoint}</KeyPoint>
                    <div className={s.menu}>
                        {
                            projects.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive((i + 1))}
                                    className={active === (i + 1) ? s.active : undefined}>
                                    {p.title}
                                </button>
                            ))
                        }
                    </div>
                </div>
                {
                    projects.map((project, i) => active === (i+1) && Content(project, i))
                }
            </div>
        </div>
    )
}


export default Portfolio;

