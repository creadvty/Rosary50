import crucifixImg from '@assets/generated_images/wooden_crucifix_in_renaissance_style.png';
import metalCrucifixImg from '@assets/generated_images/metal_religious_crucifix_renaissance_style.png';
import medalImg from '@assets/generated_images/virgin_mary_holding_baby_jesus_medal_style.png';
import annunciationImg from '@assets/generated_images/the_annunciation_to_mary_by_angel_gabriel.png';
import nativityImg from '@assets/generated_images/the_nativity_scene_jesus_in_manger.png';
import crucifixionArt from '@assets/generated_images/the_crucifixion_of_jesus_christ.png';
import ascensionArt from '@assets/generated_images/the_ascension_of_jesus_christ.png';
import baptismArt from '@assets/generated_images/the_baptism_of_jesus_christ_in_the_jordan.png';
import pilateArt from '@assets/generated_images/jesus_christ_before_pontius_pilate.png';
import sacredHeartImg from '@assets/generated_images/sacred_heart_of_jesus_and_mary.png';

import jesusEnteringJerusalem from '@assets/generated_images/jesus_entering_jerusalem_on_palm_sunday.png';
import lastSupper from '@assets/generated_images/the_last_supper_of_jesus_christ.png';
import agonyGethsemane from '@assets/generated_images/jesus_christ_in_agony_in_the_garden_of_gethsemane.png';
import betrayalJudas from '@assets/generated_images/the_betrayal_of_jesus_by_judas.png';
import jesusBeforeCaiaphas from '@assets/generated_images/jesus_christ_bound_before_the_high_priest.png';
import peterDenial from '@assets/generated_images/the_denial_of_peter_and_mockery_of_jesus.png';
import scourgingArt from '@assets/generated_images/the_scourging_of_jesus_at_the_pillar.png';
import crowningThorns from '@assets/generated_images/the_crowning_with_thorns_of_jesus_christ.png';
import pilateCondemnation from '@assets/generated_images/jesus_christ_condemned_to_death_by_pilate.png';
import carryingCross from '@assets/generated_images/jesus_christ_carrying_the_heavy_cross.png';
import jesusSidePierced from '@assets/generated_images/side_of_jesus_pierced_with_a_spear.png';
import descentFromCross from '@assets/generated_images/jesus_taken_down_from_the_cross.png';
import ascensionNew from '@assets/generated_images/the_ascension_of_jesus_christ_into_heaven.png';
import pentecostArt from '@assets/generated_images/pentecost_-_descent_of_the_holy_spirit.png';
import coronationArt from '@assets/generated_images/the_coronation_of_the_virgin_mary.png';

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
  stripIcon?: string; // Icon to show specifically on the linear strip
}

const HAIL_MARY_START = "Hail Mary, full of grace, the Lord is with you. Blessed are you among women and blessed is the fruit of your womb, Jesus";
const FATIMA_PRAYER = "O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those in most need of Your Mercy.";
const OUR_FATHER = `Our Father, Who art in heaven, 
Hallowed be Thy Name. 
Thy Kingdom come. 
Thy Will be done, 
on earth as it is in Heaven.

Give us this day our daily bread. 
And forgive us our trespasses, 
as we forgive those who trespass against us. 
And lead us not into temptation, 
but deliver us from evil. Amen.`;

const GLORY_BE = "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.";

const CREED = `I believe in God,
the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.

I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting.

Amen.`;

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

const K_CLAUSES = [
  "nailed to the cross beneath the inscription “This is the King of the Jews”",
  "who prayed for His murderers, saying “Father, forgive them, for they know not what they do”",
  "who said to the thief at His right “Amen I say to thee, this day thou shalt be with Me in paradise”",
  "who said to you, His Mother, “Woman, behold thy son”, and to John “Behold thy Mother”",
  "who cried out upon the cross: “My God, my God, why hast Thou forsaken Me?”",
  "who said “I thirst”, and after having tasted the vinegar offered to Him said “It is consummated”",
  "who at the ninth hour cried out “Father, into Thy hands I commend my spirit”",
  "who for us, poor sinners, suffered a cruel and painful death. Alleluia.",
  "whose side was pierced with a spear and from whose Sacred Heart Blood and Water poured out for the forgiveness of our sins",
  "whose sacred body was taken down from the cross and lovingly received in your arms"
];

const M_CLAUSES = [
  "whose body was wrapped in a shroud and laid in the tomb by holy men",
  "whose tomb was sealed and guarded by Pilate’s soldiers",
  "whose holy soul descended into Hell to preach the good news and conduct the holy patriarchs to Heaven",
  "who rose from the dead on the third day, filling you with ineffable joy",
  "who after His Resurrection appeared frequently to His disciples and friends to strengthen their faith",
  "who, before you and His apostles, ascended into Heaven on the fortieth day and was seated at the right hand of the Father",
  "who, as He had promised, sent the Holy Spirit to you and to His apostles on the day of Pentecost",
  "who finally called you, His Mother, to Himself, seating you at His right hand and crowning you with glory as Queen of Heaven",
  "who wants to call us, His servants and yours, to Himself after this life and through your intercession, we pray, receive us into the joy of His Father’s Kingdom",
  "who with the Father and the Holy Spirit, and with you most Holy Mother, reigns triumphant and glorious forever"
];

const rawBeads: BeadData[] = [
  {
    id: 'crucifix',
    type: 'cross',
    label: '',
    prayer: {
      title: 'Carthusian Rosary with 50 Mysteries',
      body: 'Let us meditate on the life of our Lord Jesus Christ and our Blessed Mother.'
    },
    image: sacredHeartImg
  },
  { id: 'chain-1', type: 'chain', label: '', prayer: { title: '', body: '' }, image: sacredHeartImg },
  {
    id: 'A1',
    type: 'large',
    label: 'A1',
    prayer: {
      title: "Apostles' Creed",
      body: CREED,
      subtext: OUR_FATHER
    },
    image: sacredHeartImg
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
    image: sacredHeartImg
  },
  {
    id: 'B2',
    type: 'small',
    label: 'B2',
    prayer: {
      title: 'Charity',
      body: HAIL_MARY_START,
      subtext: 'lover of the soul'
    },
    image: sacredHeartImg
  },
  {
    id: 'B3',
    type: 'small',
    label: 'B3',
    prayer: {
      title: 'Hope',
      body: HAIL_MARY_START,
      subtext: 'hope of nations'
    },
    image: sacredHeartImg
  },
  {
    id: 'C1',
    type: 'large',
    label: 'C1',
    prayer: {
      title: 'Doxology',
      body: `${GLORY_BE}\n\n${FATIMA_PRAYER}`,
    },
    image: sacredHeartImg
  },
  {
    id: 'D1',
    type: 'medal',
    label: 'D1',
    prayer: {
      title: 'The First Decade (The Birth of Christ)',
      body: OUR_FATHER,
      subtext: 'The Birth of Christ'
    },
    image: nativityImg,
    stripIcon: medalImg 
  },
  ...generateDecade('E', 'The Infancy of Christ', annunciationImg, E_CLAUSES),
  {
    id: 'F1',
    type: 'large',
    label: 'F1',
    prayer: {
      title: 'Second Decade (Youth and Public Ministry)',
      body: `${GLORY_BE}\n\n${FATIMA_PRAYER}\n\n${OUR_FATHER}`,
      subtext: 'The Youth and Public Ministry'
    },
    image: baptismArt
  },
  ...generateDecade('G', 'The Youth and Public Ministry', baptismArt, G_CLAUSES),
  {
    id: 'H1',
    type: 'large',
    label: 'H1',
    prayer: {
      title: 'The Third Decade (The Passion of the Lord)',
      body: `${GLORY_BE}\n\n${FATIMA_PRAYER}\n\n${OUR_FATHER}`,
      subtext: 'The Passion of the Lord'
    },
    image: pilateArt
  },
  {
    id: 'I1',
    type: 'small',
    label: 'I1',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[0]
    },
    image: jesusEnteringJerusalem
  },
  {
    id: 'I2',
    type: 'small',
    label: 'I2',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[1]
    },
    image: lastSupper
  },
  {
    id: 'I3',
    type: 'small',
    label: 'I3',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[2]
    },
    image: agonyGethsemane
  },
  {
    id: 'I4',
    type: 'small',
    label: 'I4',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[3]
    },
    image: betrayalJudas
  },
  {
    id: 'I5',
    type: 'small',
    label: 'I5',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[4]
    },
    image: jesusBeforeCaiaphas
  },
  {
    id: 'I6',
    type: 'small',
    label: 'I6',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[5]
    },
    image: peterDenial
  },
  {
    id: 'I7',
    type: 'small',
    label: 'I7',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[6]
    },
    image: scourgingArt
  },
  {
    id: 'I8',
    type: 'small',
    label: 'I8',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[7]
    },
    image: crowningThorns
  },
  {
    id: 'I9',
    type: 'small',
    label: 'I9',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[8]
    },
    image: pilateCondemnation
  },
  {
    id: 'I10',
    type: 'small',
    label: 'I10',
    prayer: {
      title: 'The Passion of the Lord',
      body: HAIL_MARY_START,
      subtext: I_CLAUSES[9]
    },
    image: carryingCross
  },
  {
    id: 'J1',
    type: 'large',
    label: 'J1',
    prayer: {
      title: 'The Fourth Decade (His Crucifixion)',
      body: `${GLORY_BE}\n\n${FATIMA_PRAYER}\n\n${OUR_FATHER}`,
      subtext: 'His Crucifixion'
    },
    image: crucifixionArt
  },
  {
    id: 'K1',
    type: 'small',
    label: 'K1',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[0]
    },
    image: crucifixionArt
  },
  {
    id: 'K2',
    type: 'small',
    label: 'K2',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[1]
    },
    image: crucifixionArt
  },
  {
    id: 'K3',
    type: 'small',
    label: 'K3',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[2]
    },
    image: crucifixionArt
  },
  {
    id: 'K4',
    type: 'small',
    label: 'K4',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[3]
    },
    image: crucifixionArt
  },
  {
    id: 'K5',
    type: 'small',
    label: 'K5',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[4]
    },
    image: crucifixionArt
  },
  {
    id: 'K6',
    type: 'small',
    label: 'K6',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[5]
    },
    image: crucifixionArt
  },
  {
    id: 'K7',
    type: 'small',
    label: 'K7',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[6]
    },
    image: crucifixionArt
  },
  {
    id: 'K8',
    type: 'small',
    label: 'K8',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[7]
    },
    image: crucifixionArt
  },
  {
    id: 'K9',
    type: 'small',
    label: 'K9',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[8]
    },
    image: jesusSidePierced
  },
  {
    id: 'K10',
    type: 'small',
    label: 'K10',
    prayer: {
      title: 'His Crucifixion',
      body: HAIL_MARY_START,
      subtext: K_CLAUSES[9]
    },
    image: descentFromCross
  },
  {
    id: 'L1',
    type: 'large',
    label: 'L1',
    prayer: {
      title: 'The Fifth Decade (His Resurrection)',
      body: `${GLORY_BE}\n\n${FATIMA_PRAYER}\n\n${OUR_FATHER}`,
      subtext: 'His Resurrection'
    },
    image: ascensionArt
  },
  {
    id: 'M1',
    type: 'small',
    label: 'M1',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[0]
    },
    image: ascensionArt
  },
  {
    id: 'M2',
    type: 'small',
    label: 'M2',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[1]
    },
    image: ascensionArt
  },
  {
    id: 'M3',
    type: 'small',
    label: 'M3',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[2]
    },
    image: ascensionArt
  },
  {
    id: 'M4',
    type: 'small',
    label: 'M4',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[3]
    },
    image: ascensionArt
  },
  {
    id: 'M5',
    type: 'small',
    label: 'M5',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[4]
    },
    image: ascensionArt
  },
  {
    id: 'M6',
    type: 'small',
    label: 'M6',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[5]
    },
    image: ascensionNew
  },
  {
    id: 'M7',
    type: 'small',
    label: 'M7',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[6]
    },
    image: pentecostArt
  },
  {
    id: 'M8',
    type: 'small',
    label: 'M8',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[7]
    },
    image: coronationArt
  },
  {
    id: 'M9',
    type: 'small',
    label: 'M9',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[8]
    },
    image: coronationArt
  },
  {
    id: 'M10',
    type: 'small',
    label: 'M10',
    prayer: {
      title: 'His Resurrection',
      body: HAIL_MARY_START,
      subtext: M_CLAUSES[9]
    },
    image: coronationArt
  },
  {
    id: 'N1',
    type: 'medal',
    label: 'N1',
    prayer: {
      title: 'Conclusion',
      body: `${GLORY_BE}\n\n${FATIMA_PRAYER}`,
      subtext: `Oh Immaculate, ever blessed, and glorious Virgin Mary, Mother of God; oh Temple of God, the most beautiful of all temples; oh Doorway of the Kingdom of Heaven through which the whole world has been saved, do hear me mercifully and become my sweet protectress, for me a poor and wretched sinner. Be my help in all my needs. Amen.\n\nHail, holy Queen, mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile show us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God. That we may be made worthy of the promises of Christ.\n\nLet us pray. O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal salvation. Grant, we beseech Thee, that while meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary, that we may both imitate what they contain and obtain what they promise, through Christ our Lord. Amen.\n\nMost Sacred Heart of Jesus, have mercy on us.\nImmaculate Heart of Mary, pray for us.`
    },
    image: sacredHeartImg,
    stripIcon: medalImg
  }
];

export const rosaryBeads: BeadData[] = [...rawBeads].reverse();
