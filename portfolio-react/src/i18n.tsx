import i18n from "i18next";
import {initReactI18next} from 'react-i18next'


i18n.use(initReactI18next).init({

    debug: true,
    fallbackLng: 'en',
    resources:{
        en:{
            translation:{
                home_experience: "IT Trainee at Continental Automotive / Aumovio, where I gained hands-on experience across multiple fields, identified numerous system issues, and actively participated in solving real-world technical problems.",
                home_aimaster: "ChatGPT is my #1 friend! With the power of our friendship we can develop at a high speed",
                home_degree: "I am currently completing my BSc in Business Informatics and plan to pursue a Master’s degree in Computer Science too deepen my understanding in programming.",
                
                about_hs_title:"High School",
                about_hs:"Currently studying Business Informatics, focusing on software development, databases, and building real-world projects.",
                
                about_uni_title : "BSc – Business Informatics",
                about_uni: "Currently studying Business Informatics, focusing on software development, databases, and building real-world projects.",
                
                about_work_title: "IT Trainee – Continental Automotive / Aumovio",
                about_work: "Hands-on experience across multiple fields, identifying system issues and contributing to real technical problem-solving.",

                about_projects_title: "Personal Projects",
                about_projects: "Building games, tools, and full-stack apps with a focus on performance, clean UI, and maintainable architecture.",

                about_now_title: "Leveling Up",
                about_now: "Continuously improving my skills, expanding my portfolio, and preparing for the next step.",
                
                about_tag_edu: "Education",
                about_tag_work: "Work",
                about_tag_proj: "Projects",
                about_tag_now: "Current"



            }
        },
        hu:{
            translation:{
                home_experience: "IT gyakornokként dolgoztam a Continental Automotive / Aumovio cégnél, ahol több területen is gyakorlati tapasztalatot szereztem, számos rendszerhibát azonosítottam, és aktívan részt vettem valós technikai problémák megoldásában.",
                home_aimaster: "A ChatGPT az első számú barátom! A barátságunk erejével elképesztő tempóban tudunk fejlődni és alkotni.",
                home_degree: "Jelenleg gazdaságinformatikus alapképzést végzek, és terveim szerint számítástechnika mesterszakon folytatom tanulmányaimat, hogy még mélyebben elmélyítsem programozási ismereteimet.",

                about_hs_title: "Középiskola",
                about_hs: "Megszereztem az alapokat a logikus gondolkodásban, a matematikában és a programozás iránti korai érdeklődésben.",

                about_uni_title: "BSc – Gazdaságinformatika",
                about_uni: "Jelenleg gazdaságinformatikát tanulok, a szoftverfejlesztésre, adatbázisokra és valós projektek megvalósítására fókuszálva.",

                about_work_title: "IT gyakornok – Continental Automotive / Aumovio",
                about_work: "Gyakorlati tapasztalat szerzése több területen, rendszerhibák felismerése és valós technikai problémák megoldásában való részvétel.",

                about_projects_title: "Saját projektek",
                about_projects: "Játékok, eszközök és full-stack alkalmazások fejlesztése, a teljesítményre, letisztult felhasználói felületre és jól karbantartható architektúrára fókuszálva.",

                about_now_title: "Folyamatos fejlődés",
                about_now: "Folyamatosan fejlesztem a tudásomat, bővítem a portfóliómat, és készülök a következő lépésre.",

                about_tag_edu: "Képzettség",
                about_tag_work: "Tapasztalat",
                about_tag_proj: "Projektek",
                about_tag_now: "Jelenlegi"



            }
        },
    },
})

export default i18n;