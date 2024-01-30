import { useParams } from "react-router-dom";

// import React from "react";

const Details = () => {
    const {id} = useParams();
    return(
        <div className="details">
            <img src="https://eresgarage.pl/wp-content/uploads/2022/09/jak-wybrac-warsztat.jpg" alt="Wnętrze warsztatu samochodowego"/>
            <h1>Historia Warsztatu:</h1>
Nasz warsztat samochodowy został założony w [rok założenia] z pasji do motoryzacji i zaangażowania w świadczenie usług najwyższej jakości dla naszych klientów.

<h1>Doświadczenie i Fachowość:</h1>
Zespół naszych doświadczonych mechaników posiada bogate doświadczenie w obszarze napraw samochodowych. Dzięki regularnym szkoleniom i posiadaniu najnowszego sprzętu, gwarantujemy profesjonalizm i precyzję w każdym detalu.

<h1>Obszar Usług:</h1>
Specjalizujemy się w szerokim zakresie napraw i konserwacji pojazdów. Oferujemy kompleksowe usługi, w tym diagnostykę, naprawy mechaniczne, wymianę opon, oraz przeglądy techniczne.

<h1>Nasze Wartości:</h1>
Jesteśmy oddani zapewnianiu bezpieczeństwa i satysfakcji naszych klientów. Nasze wartości obejmują rzetelność, uczciwość, oraz troskę o każdy pojazd tak, jakby należał do nas samych.

<h1>Nowoczesne Wyposażenie:</h1>
Nasz warsztat jest wyposażony w najnowocześniejszy sprzęt, co umożliwia nam skuteczne diagnozowanie i naprawianie wszelkiego rodzaju usterek. Stale inwestujemy w nowe technologie, aby sprostać rosnącym wymaganiom motoryzacyjnym.

<h1>Ekologiczne Praktyki:</h1>
Jesteśmy świadomi wpływu motoryzacji na środowisko, dlatego stosujemy ekologiczne praktyki w naszym warsztacie. Dbamy o odpowiednie utylizowanie odpadów i promujemy używanie ekologicznych materiałów.

<h1>Satysfakcja Klienta:</h1>
Zależy nam na pełnej satysfakcji klientów. Dlatego stawiamy na transparentność, jasną komunikację oraz konkurencyjne ceny. Naszym celem jest zapewnienie bezpiecznej i sprawnej jazdy każdemu naszemu klientowi.

<h1>Zaufanie i Rekomendacje:</h1>
Dumni jesteśmy z budowania trwałych relacji z naszymi klientami. Zaufanie, jakim nas obdarzają, jest dla nas najważniejsze. Cieszymy się również z licznych pozytywnych rekomendacji od naszych zadowolonych użytkowników.

<h1>Społeczna Aktywność:</h1>
Angażujemy się również w lokalną społeczność, uczestnicząc w różnych akcjach charytatywnych i wspierając inicjatywy społeczne. Chcemy być postrzegani nie tylko jako warsztat samochodowy, ale również jako aktywni członkowie społeczności.
        </div>

    )
}

export default Details;