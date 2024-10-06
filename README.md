# Portfolio-What_Can_I_Cook

Hlavní myšlenka aplikace je vytvořit vyhledávač receptů, podle toho, jaké mám zrovna k dispozici suroviny a k tomu vytvořit další základní chování (uživatelské profily, oblíbené recepty, autoři...)

> [!NOTE]
> Screenshoty z live aplikace se nachází ve složce `screenshots`

Tato aplikace není kompletní, jsou zde pouze některé funkční části - komponenty a endpointy, pár důležitých endpointů a funkcí jsem zatím nestihl dodělat
Frontend aplikace je vytvořen v Reactu
Testovací API je jednoduchý JSON-Server, pomocí kterého jsem testoval fetch requesty z frontendu a posílal data na frontend / na server

Co aplikace zatím obsahuje:
- Frontend část pro login / register
- Zobrazení testovacích profilů - zobrazení vytvořených a oblíbených receptů, jednoduché data profilu
- Seznam surovin jednotlivých uživatelů (zatím nezávisle na loginu) - odebírání a přidávání surovin
- Většinu komponent, které se dají použít pro dodělání dalších endpointů

Co aplikaci chybí pro plnou funkčnost a plánuju v budoucnu dodělat:
- Login / Registrační systém uživatelů
- Nastavení
- Editor na vytváření receptů
- Stránka zobrazení receptu
- Hlavní stránka pro feed a vyhledávání receptů
- Responzivita
