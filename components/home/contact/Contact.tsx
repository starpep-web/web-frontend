import React from 'react';
import { Columns, Content } from 'react-bulma-components';
import MemberCard from './MemberCard';
import carlos from '/public/avatars/carlos-brizuela.jpg';
import noel from '/public/avatars/noel-perez.jpg';
import longendri from '/public/avatars/longendri-aguilera.jpg';
import yovani from '/public/avatars/yovani-marrero.jpg';
import boy from '/public/avatars/boy.png';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  return (
    <div className={styles.contact}>
      <Content size="large" textAlign="center" className={styles['header-container']}>
        <h2 className={styles.header}>Meet our Team</h2>
      </Content>
      <div className={styles.members}>
        <Content size="medium" textAlign="center">
          <h3 className={styles['head-of-project-header']}>Head of Project</h3>
        </Content>
        <Columns centered className={styles['head-project-columns']}>
          <Columns.Column size="one-third">
            <MemberCard
              className={styles['head-project-card']}
              name="Yovani Marrero-Ponce"
              email="ymarrero77@yahoo.es"
              shortCV="Yovani Marrero-Ponce received the BSc degree in Pharmaceutical Sciences (summa cum laude) from the Universidad Central de las Villas (UCLV), Santa Clara, Cuba, in 2001, the MSc degree in Biochemistry from Medical University “Dr. Serafin Ruiz-de Zarate Ruiz”, Santa Clara, Cuba, in 2004, and the PhD degree in Chemistry from Havana University, Havana City, Cuba, in 2005. After post-doctoral fellowships at the University of Valencia, Spain, he founded the Unit of Computer-Aided Molecular “Biosilico” Discovery and Bioinformatic Research (CAMD-BIR Unit, today is known as CAMD-BIR International Network) as a spin-off of the Department of Pharmacy at UCLV. His research interests include molecular modelling and drug discovery, chem-bio-med-informatics, molecular descriptor, chemogenomics, and mathematical, theoretical, and computational chemistry. Recently, Marrero-Ponce have been selected in the TOP 1% of researchers worldwide who have carried out research of excellence in the last 60 years in all fields of science. DOI: 10.17632/btchxktzyw.3."
              avatar={yovani.src}
              occupation="Grupo de Medicina Molecular y Traslacional (MeM&T), Escuela de Medicina"
            />
          </Columns.Column>
          <Columns.Column size="one-third">
            <MemberCard
              className={styles['head-project-card']}
              name="Noel Pérez Pérez"
              email="nperez@usfq.edu.ec"
              shortCV="Noel Pérez-Pérez (M'19-SM'23) received a B.Eng. degree in computer science engineering and a M.Sc. degree in applied computer science in the field of digital image processing, pattern recognition, and machine learning from the Universidad de Ciego de Avila, Cuba, in 2005 and 2007, respectively, and the Ph.D. degree in the field of data mining, from the University of Porto, Portugal, in 2015. From 2008 to 2015, he was a Fellow Researcher with the Institute of Mechanical Engineering and Industrial Management, Faculty of Engineering, University of Porto. From 2015 to 2017, he was with the Instituto de Telecomunicações, Faculty of Sciences, University of Porto, as a Postdoctoral Fellow. Since 2017, he has been a Full-Time Professor at the Universidad San Francisco de Quito, Ecuador, where he co-founded the Applied Signal Processing and Machine Learning Research Group. His research interests include digital image processing, data mining, pattern recognition, and machine learning."
              avatar={noel.src}
              occupation="Research Professor Applied Signal Processing & Machine Learning (ASP&ML) research group"
            />
          </Columns.Column>
        </Columns>
        <Content size="medium" textAlign="center">
          <h3 className={styles['collaborators-header']}>Collaborators and Developers</h3>
        </Content>
        <Columns breakpoint="tablet">
          <Columns.Column size="one-fifth">
            <MemberCard
              name="Longendri Aguilera Mendoza"
              email="longendri@gmail.com"
              shortCV="PhD in computer science, Center for Scientific Research and Higher Education of Ensenada (CICESE), Ensenada, Mexico. Masters in bioinformatics, Higher Institute of Technologies and Applied Sciences (InSTEC), Havana, Cuba. Bachelor of Computer Science, University of Havana, Havana, Cuba. An enthusiast Data Engineer/Scientist and Software Developer with a background in using technology to get insight into a large amount of data."
              avatar={longendri.src}
            />
          </Columns.Column>
          <Columns.Column size="one-fifth">
            <MemberCard
              name="Carlos A. Brizuela"
              email="cbrizuel@cicese.mx"
              shortCV="Carlos Brizuela received a B.Eng. from Tijuana Institute of Technology and an M.Sc. degree in Electronics and Telecommunications from CICESE in 1994. He received a Ph.D. degree in Information and Production Science from Kyoto Institute of Technology in 2001. He joined the CS Department at CICESE in 2001 where he founded the Computational Biology Lab. His research interests include the in silico identification and design of Antimicrobial Peptides and the analysis and design of algorithms for complex combinatorial optimization problems."
              avatar={carlos.src}
              occupation="Senior Researcher. CS – Applied Physics Division"
            />
          </Columns.Column>
          <Columns.Column size="one-fifth">
            <MemberCard
              name="Cesar Jaca"
              email="cesar@email.com"
              shortCV="Short CV Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ante sit amet quam dictum, pellentesque mattis arcu ornare. Morbi et mauris posuere"
              avatar={boy.src}
            />
          </Columns.Column>
          <Columns.Column size="one-fifth">
            <MemberCard
              name="Roberto Cárdenas"
              email="jroberto.cardenasm@gmail.com"
              shortCV="Short CV Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ante sit amet quam dictum, pellentesque mattis arcu ornare. Morbi et mauris posuere"
              avatar={boy.src}
              occupation="Frontend Developer, UI Designer"
            />
          </Columns.Column>
          <Columns.Column size="one-fifth">
            <MemberCard
              name="Christian López"
              email="clopeza@alumni.usfq.edu.ec"
              shortCV="Short CV Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ante sit amet quam dictum, pellentesque mattis arcu ornare. Morbi et mauris posuere"
              avatar={boy.src}
              occupation="Software Developer"
            />
          </Columns.Column>
        </Columns>
      </div>
    </div>
  );
};

export default Contact;
