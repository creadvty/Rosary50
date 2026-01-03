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

const generateDecade = (
  prefix: string, 
  mysteryTitle: string, 
  mysteryImage: string,
  clauses: string[] = []
): BeadData[] => {
  const beads: BeadData[] = [];
  
  // Large Bead (Our Father / Mystery Intro)
  // For the first decade (D1), the user specified it separately.
  // For subsequent decades, usually the single bead preceding acts as the Our Father/Glory Be transition.
  
  // Decade Beads
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

// Clauses for Decade 1 (E1-E10)
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

export const rosaryBeads: BeadData[] = [
  // Crucifix
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
  // Chain/Spacer
  {
    id: 'chain-1',
    type: 'chain',
    label: '',
    prayer: { title: '', body: '' },
    image: crucifixImg
  },
  // A1
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
  // B1-B3
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
  // C1
  {
    id: 'C1',
    type: 'large',
    label: 'C1',
    prayer: {
      title: 'Doxology',
      body: 'Glory be to the Father, and to the Son, and to the Holy Spirit.',
      subtext: 'O my Jesus, forgive us our sins, save us from the fires of hell...'
    },
    image: crucifixImg
  },
  // D1 (Medal)
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
  // E1-E10
  ...generateDecade('E', 'The Infancy of Christ', annunciationImg, E_CLAUSES),
  
  // F1
  {
    id: 'F1',
    type: 'large',
    label: 'F1',
    prayer: {
      title: 'Doxology',
      body: 'Glory be to the Father, and to the Son, and to the Holy Spirit.',
    },
    image: nativityImg
  },
  
  // Placeholder for G-M sections as text wasn't provided, 
  // but structure is needed for visualization.
  ...generateDecade('G', 'The Second Decade', nativityImg),
  { id: 'H1', type: 'large', label: 'H1', prayer: { title: 'Doxology', body: 'Glory Be...' }, image: nativityImg },
  
  ...generateDecade('I', 'The Third Decade', nativityImg),
  { id: 'J1', type: 'large', label: 'J1', prayer: { title: 'Doxology', body: 'Glory Be...' }, image: nativityImg },
  
  ...generateDecade('K', 'The Fourth Decade', nativityImg),
  { id: 'L1', type: 'large', label: 'L1', prayer: { title: 'Doxology', body: 'Glory Be...' }, image: nativityImg },
  
  ...generateDecade('M', 'The Fifth Decade', nativityImg),
  
  // N1 Medal
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
