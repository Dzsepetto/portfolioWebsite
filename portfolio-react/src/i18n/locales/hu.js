const hu = {
  translation: {
    navigation: {
      "openMenu": "Navigációs menü megnyitása",
      "closeMenu": "Navigációs menü bezárása"
    },
    home: {
      intro: {
        title: "Üdv",
        desc: "Görgess lejjebb, hogy többet megtudj rólam",
        mobile_hint: "A legsimább élményért asztali gépen nézd meg.",
      },
      title: "Pintér Benedek",
      experience: "4 év informatikai tapasztalat, elsősorban .NET fejlesztésben és PowerShell szkriptelésben, kiegészítve IT támogatási és rendszerüzemeltetési feladatokkal. Jelenleg ASP.NET fejlesztőként vállalati MES rendszerek fejlesztésében veszek részt.",
      experience_title: "Tapasztalat",
      devappr_title: "Developer szemlélet",
      devappr: "Hiszek abban, hogy a szoftvereknek megbízhatónak, jól karbantarthatónak és felhasználóközpontúnak kell lenniük. Célom tiszta, skálázható kódot írni, miközben folyamatosan új technológiákat és fejlesztési módszereket sajátítok el.",
      degree_title: "Végzettség",
      degree: "Gazdaságinformatikus képzésen (BSc) szereztem diplomát, amely során erős alapokat szereztem a szoftverfejlesztés, az adatbázisok, a rendszerelemzés és az üzleti informatika területén."
    },

    experience: {
      intro: {
        title: "Tapasztalataim",
        desc: "Görgess lejjebb"
      },
      title: "Tapasztalat",
      conti: {
        post: "IT gyakornok",
        title: "Continental Hungary Kft. / Aumovio Hungary Kft.",
        period: "2023 — 2026",
        description: "IT gyakornokként széles körű tapasztalatot szereztem vállalati informatikai rendszerek üzemeltetésében és fejlesztésében. Feladataim közé tartozott a felhasználói támogatás, PowerShell alapú automatizálási megoldások készítése, valamint belső .NET alapú alkalmazások és API-k fejlesztése. A projektek során önállóan dolgoztam olyan megoldásokon, amelyek egyszerűsítették a mindennapi IT folyamatokat és növelték a csapat hatékonyságát.",
        tasks: {
          support: "Ticket alapú felhasználói támogatás, hibajegyek kezelése, problémák diagnosztizálása, jogosultságkezelés és általános IT adminisztráció.",
          automation: "PowerShell alapú automatizációs szkriptek fejlesztése szoftvertelepítéshez, monitorozáshoz és ismétlődő IT feladatok kiváltásához.",
          development: "Többrétegű belső adminisztrációs rendszer fejlesztése .NET webes felülettel, háttér API-kkal és scriptintegrációval.",
        },
      },
      Neumann: {
        post: "Full-stack fejlesztő",
        title: "Neumann Consulting Kft.",
        period: "2026 — jelenleg",
        description: "Full-stack fejlesztőként egy platformfüggetlen, könnyűsúlyú MES (Manufacturing Execution System) fejlesztésén dolgozom ASP.NET és C# technológiákkal. A rendszer célja, hogy rugalmasan telepíthető legyen helyi infrastruktúrára vagy felhőalapú környezetbe, miközben modern, skálázható architektúrát biztosít ipari felhasználásra.",
        tasks: {
          backend: "ASP.NET alapú backend szolgáltatások és REST API-k fejlesztése, üzleti logika megvalósítása és adatkezelési folyamatok kialakítása.",
          architecture: "Hitelesítés és jogosultságkezelés megvalósítása, SignalR alapú valós idejű kommunikáció fejlesztése, valamint többszálú feldolgozási folyamatok kialakítása a nagy teljesítmény érdekében.",
          development: "Új funkciók tervezése és implementálása, adatbázis-integráció, rendszeroptimalizálás, valamint a teljes alkalmazás folyamatos fejlesztése és karbantartása.",
        },
      },
    },

    footer: {
      contact: "Keress meg",
      languages: "Programozási Nyelvek",
      social: "Közösségi Oldalak",
      cv: {
        title: "Önéletrajz",
        desc: "Önéletrajz megjelenítése"
      }
    },

    projects: {
      intro: {
        title: "Projektek",
        desc: "Görgess lejjebb"
      },
      heading: "PROJEKTEK",
      back: "Vissza",
      rikiki: {
        title: "Rikiki Kings",
        description: "A Rikiki Kings egy mobilos pontszámító alkalmazás, amely a népszerű Rikiki kártyajátékhoz készült .NET MAUI technológiával. Az app célja, hogy egyszerűen és gyorsan kezelje a játékok pontozását, miközben hosszabb távon statisztikákat is biztosít a játékosok számára. Különlegessége, hogy lokális SQLite adatbázist használ, így internetkapcsolat nélkül is teljes értékűen működik. Bejelentkezés után lehetőség van az adatok felhővel való szinkronizálására, így a játékok és statisztikák több eszközön is elérhetők. A felhasználók vendégként ('guest') is hozzáadhatnak játékosokat, akiket később összepárosíthatnak valódi, regisztrált profilokkal, így a korábbi eredmények és statisztikák automatikusan megjelennek náluk is.",
      },
      portfolio: {
        title: "Portfólió",
        description: "Ez egy modern, reszponzív portfólió weboldal, amely bemutatja a projektjeimet, készségeimet és szakmai tapasztalataimat. A célja, hogy átlátható és vizuálisan is vonzó módon prezentálja a munkáimat, legyen szó webfejlesztésről, dizájnról vagy egyéb kreatív projektekről. Az oldal könnyen navigálható, gyors és minden eszközön jól használható.",
      },
      quiz: {
        title: "Kvíz Weboldal",
        description: "Ez egy interaktív kvíz weboldal, amely különböző témákban kínál játékos és tudásalapú kihívásokat a felhasználóknak. Az oldal célja, hogy szórakoztató és könnyen használható formában tegye elérhetővé a kvízeket, akár egyéni játékra is. Bejelentkezés után a játékosok felkerülhetnek a leaderboardra, így az eredményeik összehasonlíthatók mások teljesítményével is. A projekt hosszabb távú célja egy olyan valós idejű többjátékos élmény kialakítása, ahol egyszerre többen is részt vehetnek ugyanabban a kvízben, hasonlóan a Kahoot működéséhez.",
      },
      zorka: {
        title: "Zorka Webshop",
        description: "Egy Flask alapú webshop alkalmazás, amelyet egy barátommal közösen fejlesztettünk. Tartalmaz REST API-t, dinamikus termékmegjelenítést, szűrési és rendezési funkciókat, valamint reszponzív felhasználói felületet. A projekt során a tiszta architektúrára és a jól karbantartható kódra helyeztük a hangsúlyt."
      },
      nas: {
        title: "Nas Monitoring",
        description: "Pi NAS Monitoring egy saját fejlesztésű webes monitoring rendszer Raspberry Pi alapú NAS szerverekhez. A projekt célja, hogy egy modern, reszponzív felületen jelenítse meg a háttértárak állapotát, tárhelyhasználatát, rendszerinformációkat és a Hard Disk Sentinel által szolgáltatott adatokat. A backend ASP.NET Core Web API-ra, a frontend Reactre épül, a biztonságos távoli elérést pedig egy privát Tailscale hálózat biztosítja. A projekt jelenleg is aktív fejlesztés alatt áll, a cél egy könnyen telepíthető és bővíthető NAS monitoring megoldás létrehozása."
      },
    },
  },
};

export default hu;