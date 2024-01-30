import { useParams } from "react-router-dom";

// import React from "react";

const Details = () => {
    const {id} = useParams();
    return(
        <div className="details">
            <img src="https://eresgarage.pl/wp-content/uploads/2022/09/jak-wybrac-warsztat.jpg" alt="Wnętrze warsztatu samochodowego"/>
            <div className="detailsTEXT">
            <h4>Historia Warsztatu:</h4>
Nasz warsztat samochodowy zaczynał swoją działalność w [rok założenia], ponieważ kochamy samochody i chcemy pomagać ludziom w dbaniu o nie.
<h4>Doświadczenie i Fachowość:</h4>
W naszym zespole pracują super doświadczeni mechanicy, którzy znają się na naprawach samochodów. Ciągle się uczą i używają najnowocześniejszych narzędzi, żeby wszystko było zrobione dokładnie.

<h4>Obszar Usług:</h4>
Robimy wiele różnych rzeczy dla samochodów - sprawdzamy, co jest źle, naprawiamy silniki, zmieniamy opony i patrzymy, czy wszystko działa jak trzeba.

<h4>Nasze Wartości:</h4>
Jesteśmy bardzo uczciwi i zawsze dbamy o to, żeby nasi klienci byli bezpieczni i zadowoleni. Nasze zasady to uczciwość, rzetelność i troska o samochody, jakby były nasze własne.

<h4>Nowoczesne Wyposażenie:</h4>
Mamy też super sprzęt, który pomaga nam znaleźć i naprawić problemy w samochodach. Zawsze inwestujemy w nowe rzeczy, żeby być na bieżąco z nowinkami w motoryzacji.

<h4>Ekologiczne Praktyki:</h4>
Wiemy, że samochody wpływają na środowisko, więc dbamy o to, żeby nasz warsztat był przyjazny dla planety. Starannie utylizujemy odpady i używamy materiałów, które są dobre dla środowiska.

<h4>Satysfakcja Klienta:</h4>
Najważniejsze dla nas jest, żeby nasi klienci byli zadowoleni. Zawsze mówimy jasno, ile coś kosztuje, i staramy się, żeby ceny były uczciwe. Chcemy, żeby każdy czuł się bezpiecznie i pewnie korzystając z naszych usług.

<h4>Zaufanie i Rekomendacje:</h4>
Cieszymy się, że nasi klienci nam ufają i polecają nas innym. To dla nas najważniejsze. Zawsze staramy się budować dobre relacje z ludźmi, którzy do nas przychodzą.

<h4>Społeczna Aktywność:</h4>
Oprócz naprawiania samochodów, angażujemy się w lokalną społeczność. Pomagamy innym ludziom i wspieramy różne akcje charytatywne. Chcemy być nie tylko warsztatem samochodowym, ale też częścią społeczności.
            </div>
            
        </div>

    )
}

export default Details;