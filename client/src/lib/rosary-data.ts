import crucifixImg from '@assets/generated_images/wooden_crucifix_in_renaissance_style.png';
import medalImg from '@assets/generated_images/virgin_mary_holding_baby_jesus_medal_style.png';
import annunciationImg from '@assets/generated_images/the_annunciation_to_mary_by_angel_gabriel.png';
import nativityImg from '@assets/generated_images/the_nativity_scene_jesus_in_manger.png';

export type BeadType = 'cross' | 'medal' | 'small' | 'large' | 'chain';

export interface BeadData {
  id: string;
  type: BeadType;
  label: string;
  prayer: {
    title: string;
    body: string;
    subtext?: string;
  };
  image: string;
}

const HAIL_MARY_START = "Hail Mary, full of grace, the Lord is with you. Blessed are you among women and blessed is the fruit of your womb, Jesus";
const FATIMA_PRAYER = "O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those in most need of Your Mercy.";

const generateDecade = (
  prefix: string, 
  mysteryTitle: string, 
  mysteryImage: string,
  clauses: string[] = []
): BeadData[] => {
  const beads: BeadData[] = [];
  for (let i = 1; i <= 10; i++) {
    const clause = clauses[i-1] || `[Mystery Clause ${i}]`;
    beads.push({
      id: `${prefix}${i}`,
      type: 'small',
      label: `${prefix}${i}`,
      prayer: {
        title: mysteryTitle,
        body: `${HAIL_MARY_START}`,
        subtext: clause
      },
      image: mysteryImage
    });
  }
  return beads;
};

const E_CLAUSES = [
  "conceived in you by the Holy Spirit during the annunciation of the angel",
  "with whom you visited Saint Elisabeth in the hill country, and whom John the Baptist recognized while yet in his mother’s womb",
  "to whom you, perpetually virgin in body and soul, gave birth with joy",
  "whom you wrapped in swaddling clothes and laid in a manger",
  "whose birth the angels celebrated singing “Glory to God in the highest; and on earth peace to men of good will”, and whom the shepherds visited in Bethlehem",
  "who was circumcised on the eighth day and given the name which is above every other name",
  "who was sought for and worshiped by the Magi",
  "whom you carried to the Temple and presented to God, His Father",
  "who was lovingly received in the arms of old Simeon, and recognised by the holy prophetess, Anna",
  "with whom you fled into Egypt as directed by the angel, to avoid Herod’s persecution"
];

const G_CLAUSES = [
  "with whom you returned home after seven years, when directed by the angel",
  "left in Jerusalem when He was twelve years old, and found in the Temple after three days",
  "who each day grew further in wisdom and grace before God and man",
  "whom John baptised in the Jordan and called the Lamb of God",
  "who fasted forty days in the desert and overcame the temptations put to Him by Satan",
  "who called the disciples and proclaimed the kingdom of God",
  "who healed the sick, freed the possessed, and raised the dead to life",
  "whose feet Mary Magdalene washed with her tears, dried with her hair, and anointed with her perfume",
  "who was transfigured on Mt. Tabor in the presence of Peter, James, and John",
  "who raised Lazarus to life after he had been dead for four days"
];

const I_CLAUSES = [
  "who was welcomed as the Messiah as He entered Jerusalem on Palm Sunday",
  "who at the Last Supper instituted the sacrament of the Most Holy Eucharist",
  "who prayed in agony in the garden of Gethsemane",
  "who, betrayed by Judas and abandoned by His friends, willingly placed Himself in the hands of His captors",
  "who, captured and roughly bound, was before the high priest",
  "who was denied three times by Simon Peter and was falsely accused, mocked, beaten, and spat upon by the crowd",
  "who was scourged at the pillar on orders given by Pilate",
  "who was wrapped in a purple robe, crowned with thorns, and hailed as king by mocking soldiers",
  "who before Caiaphas and Pilate was condemned to a wicked death",
  "who was given the burden of the cross to bear like a criminal to the hill of Golgotha"
];

const rawBeads: BeadData[] = [
  {
    id: 'crucifix',
    type: 'cross',
    label: 'Cross',
    prayer: {
      title: 'The Sign of the Cross',
      body: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
      subtext: 'Apostles Creed'
    },
    image: crucifixImg
  },
  { id: 'chain-1', type: 'chain', label: '', prayer: { title: '', body: '' }, image: crucifixImg },
  {
    id: 'A1',
    type: 'large',
    label: 'A1',
    prayer: {
      title: 'Introduction',
      body: 'Our Father, who art in heaven, hallowed be thy name...',
      subtext: 'Apostle\'s Creed'
    },
    image: crucifixImg
  },
  {
    id: 'B1',
    type: 'small',
    label: 'B1',
    prayer: {
      title: 'Faith',
      body: HAIL_MARY_START,
      subtext: 'source of our salvation'
    },
    image: crucifixImg
  },
  {
    id: 'B2',
    type: 'small',
    label: 'B2',
    prayer: {
      title: 'Hope',
      body: HAIL_MARY_START,
      subtext: 'lover of the soul'
    },
    image: crucifixImg
  },
  {
    id: 'B3',
    type: 'small',
    label: 'B3',
    prayer: {
      title: 'Charity',
      body: HAIL_MARY_START,
      subtext: 'hope of nations'
    },
    image: crucifixImg
  },
  {
    id: 'C1',
    type: 'large',
    label: 'C1',
    prayer: {
      title: 'Doxology',
      body: 'Glory be to the Father, and to the Son, and to the Holy Spirit.',
      subtext: FATIMA_PRAYER
    },
    image: crucifixImg
  },
  {
    id: 'D1',
    type: 'medal',
    label: 'D1',
    prayer: {
      title: 'The First Decade',
      body: 'Our Father, who art in heaven...',
      subtext: 'The Birth of Christ'
    },
    image: medalImg
  },
  ...generateDecade('E', 'The Infancy of Christ', annunciationImg, E_CLAUSES),
  {
    id: 'F1',
    type: 'large',
    label: 'F1',
    prayer: {
      title: 'Doxology & Transition',
      body: `Glory be to the Father... ${FATIMA_PRAYER} Our Father...`,
      subtext: 'The Second Decade (Youth and Public Ministry)'
    },
    image: nativityImg
  },
  ...generateDecade('G', 'The Youth and Public Ministry', nativityImg, G_CLAUSES),
  {
    id: 'H1',
    type: 'large',
    label: 'H1',
    prayer: {
      title: 'Doxology & Transition',
      body: `Glory be to the Father... ${FATIMA_PRAYER} Our Father...`,
      subtext: 'The Third Decade (The Passion of the Lord)'
    },
    image: nativityImg
  },
  ...generateDecade('I', 'The Passion of the Lord', nativityImg, I_CLAUSES),
  { id: 'J1', type: 'large', label: 'J1', prayer: { title: 'Doxology', body: 'Glory Be...' }, image: nativityImg },
  ...generateDecade('K', 'The Fourth Decade', nativityImg),
  { id: 'L1', type: 'large', label: 'L1', prayer: { title: 'Doxology', body: 'Glory Be...' }, image: nativityImg },
  ...generateDecade('M', 'The Fifth Decade', nativityImg),
  {
    id: 'N1',
    type: 'medal',
    label: 'N1',
    prayer: {
      title: 'Conclusion',
      body: 'Hail, Holy Queen, Mother of Mercy...',
      subtext: 'Final Prayers'
    },
    image: medalImg
  }
];

export const rosaryBeads: BeadData[] = [...rawBeads].reverse();
