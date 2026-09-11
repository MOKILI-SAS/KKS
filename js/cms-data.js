/**
 * KKS Groupe Électrique SARLU — CMS Data Store & Content Engine
 * Framework MOKILI
 * 
 * Données officielles extraites du Portfolio PDF et des documents KKS.
 */

const DEFAULT_KKS_DATA = {
  company: {
    name: "KKS Groupe Électrique SARLU",
    shortName: "KKS Groupe Électrique",
    tagline: "L'énergie de votre confiance",
    subTagline: "La qualité • La sécurité • Le professionnalisme au service de vos installations",
    address: "Huilerie, avenue Luvungi N°158, Q/Dialo, C/Kinshasa",
    city: "Kinshasa",
    country: "République Démocratique du Congo",
    phone: "+243 983 030 088",
    phoneClean: "+243983030088",
    email: "kksgroupeelectric@gmail.com",
    secondaryPhone1: "0979773610",
    secondaryPhone2: "0826909080",
    openingHours: "Lundi - Samedi : 08h00 - 18h00 | Urgences & Dépannages : 24h/7j",
    partner: "Société Nationale d'Électricité (SNEL)",
    heroTitle: "L'excellence en ingénierie et installations électriques à Kinshasa",
    heroSubtitle: "Entreprise d'ingénierie et de services reconnue, spécialisée dans l'électricité générale. Partenaire qualifié de la SNEL pour l'étude, l'installation et la maintenance d'infrastructures électriques MT/BT fiables et conformes aux normes.",
    aboutText1: "KKS Groupe Électrique SARLU est une entreprise d'ingénierie et de services reconnue, spécialisée dans le secteur de l'électricité générale à Kinshasa et en République Démocratique du Congo.",
    aboutText2: "Nous accompagnons nos clients institutionnels et privés, y compris la Société Nationale d'Électricité (SNEL), dans l'étude, l'installation et la maintenance d'infrastructures électriques en garantissant une fiabilité sans faille et une stricte conformité aux normes en vigueur.",
    aboutText3: "Nos équipes pluridisciplinaires d'ingénieurs et techniciens hautement qualifiés interviennent sur l'ensemble de la chaîne de valeur : moyenne tension, basse tension, cabines de transformation, câblage sous dalle et réseaux de distribution.",
    rccm: "CD/KNG/RCCM/19-B-006053",
    idnat: "01-832-N45708Q",
    impot: "B225461R"
  },

  media: {
    logo: "assets/images/logo-kks.jpg",
    heroCardImage: "assets/images/kks-cabine-snel-ngaliema.jpg",
    aboutImage: "assets/images/kks-services-presentation.jpg",
    video: "assets/videos/kks-presentation.mp4",
    videoPoster: "assets/images/kks-equipe-technique-banner.jpg"
  },

  products: [
    {
      id: "prod-1",
      name: "Matériel Électrique (1)",
      description: "Équipement électrique professionnel pour vos installations. Veuillez nous contacter pour les détails techniques.",
      price: "Sur devis",
      image: "Produit/produit-1.jpeg"
    },
    {
      id: "prod-2",
      name: "Matériel Électrique (2)",
      description: "Composant de distribution pour réseaux moyenne et basse tension.",
      price: "Sur devis",
      image: "Produit/produit-2.jpeg"
    },
    {
      id: "prod-3",
      name: "Matériel Électrique (3)",
      description: "Accessoires et équipements pour cabines privées SNEL.",
      price: "Sur devis",
      image: "Produit/produit-3.jpeg"
    },
    {
      id: "prod-4",
      name: "Matériel Électrique (4)",
      description: "Tableaux, coffrets ou disjoncteurs pour la sécurisation de vos installations.",
      price: "Sur devis",
      image: "Produit/produit-4.jpeg"
    },
    {
      id: "prod-5",
      name: "Matériel Électrique (5)",
      description: "Outillage ou équipement de raccordement pour câblages industriels.",
      price: "Sur devis",
      image: "Produit/produit-5.jpeg"
    },
    {
      id: "prod-6",
      name: "Matériel Électrique (6)",
      description: "Câblage ou système d'éclairage pour vos chantiers.",
      price: "Sur devis",
      image: "Produit/produit-6.jpeg"
    },
    {
      id: "prod-7",
      name: "Matériel Électrique (7)",
      description: "Pièces de rechange et matériels de maintenance électrique divers.",
      price: "Sur devis",
      image: "Produit/produit-7.jpeg"
    }
  ],

  domains: [
    {
      id: "bt-mt",
      num: "01",
      title: "Basse & Moyenne Tension (MT / BT)",
      description: "Installation électrique complète, tirage de câbles électriques aériens et souterrains, pose de tableaux de distribution et systèmes d'éclairage public et bâtiment. Poses et raccordements 15kVA, 20kVA, 30kVA, 32kVA.",
      icon: "zap",
      badge: "Spécialité MT/BT"
    },
    {
      id: "maintenance",
      num: "02",
      title: "Maintenance Industrielle & Bâtiment",
      description: "Dépannage d'urgence 24h/24, entretien préventif et correctif de vos installations pour assurer une continuité de service optimale et éviter les arrêts d'activité.",
      icon: "tool",
      badge: "Intervention 24h"
    },
    {
      id: "etudes",
      num: "03",
      title: "Études, Planification & Sous-traitance",
      description: "Sous-traitance experte de travaux électriques, ingénierie, étude approfondie, dimensionnement, calculs de charges et conception de réseaux électriques fiables et sécurisés.",
      icon: "clipboard",
      badge: "Bureau d'études"
    }
  ],

  services: [
    {
      id: "serv-1",
      num: "01",
      title: "Câblage & Tableaux Électriques",
      category: "Installation",
      description: "Fournitures et poses de câbles électriques (aériens et souterrains), ainsi que l'installation et le paramétrage complet des tableaux de distribution.",
      icon: "cpu"
    },
    {
      id: "serv-2",
      num: "02",
      title: "Dépannage Électrique d'Urgence",
      category: "Maintenance",
      description: "Diagnostic rapide et précis, réparation et intervention d'urgence 24h/7j pour tous vos problèmes électriques.",
      icon: "alert-triangle"
    },
    {
      id: "serv-3",
      num: "03",
      title: "Tirage de Câbles MT / BT",
      category: "Réseaux",
      description: "Tirage et pose de câbles moyenne et basse tension en respectant strictement les règles de pose et de sécurité.",
      icon: "layers"
    },
    {
      id: "serv-4",
      num: "04",
      title: "Maintenance & Entretien Préventif",
      category: "Maintenance",
      description: "Entretien préventif et correctif de vos installations pour assurer une continuité de service optimale et pérenne.",
      icon: "activity"
    },
    {
      id: "serv-5",
      num: "05",
      title: "Installation Électrique Bâtiment",
      category: "Bâtiment",
      description: "Installations complètes pour bâtiments résidentiels, commerciaux et industriels de l'étude à la mise en service.",
      icon: "home"
    },
    {
      id: "serv-6",
      num: "06",
      title: "Installation Cabine Privée (Moyenne Tension)",
      category: "Moyenne Tension",
      description: "Fourniture, montage, raccordement et mise en service de cabines électriques et transformateurs industriels.",
      icon: "box"
    },
    {
      id: "serv-7",
      num: "07",
      title: "Installation Solaire & Énergie Autonome",
      category: "Énergie",
      description: "Dimensionnement et installation de solutions solaires photovoltaïques adaptées aux besoins énergétiques.",
      icon: "sun"
    },
    {
      id: "serv-8",
      num: "08",
      title: "Facilitation Raccordement Électrique & SNEL",
      category: "Raccordement",
      description: "Accompagnement dans les démarches techniques de raccordement au réseau SNEL, compteurs intelligents et mise en conformité.",
      icon: "check-circle"
    },
    {
      id: "serv-9",
      num: "09",
      title: "Vente de Matériels Électriques Certifiés",
      category: "Fourniture",
      description: "Disjoncteurs, fusibles NT1, câbles homologués, armoires, conduits ICTA et appareillages électriques de qualité.",
      icon: "shopping-bag"
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Installation d'une Cabine Privée « De La Bonne »",
      location: "Commune de Ngaliema, Kinshasa",
      client: "Partenariat avec la SNEL",
      type: "Moyenne Tension / Basse Tension",
      badge: "Partenariat SNEL",
      image: "assets/images/kks-cabine-snel-ngaliema.jpg",
      description: "Pose, raccordement et mise en service d'une cabine électrique privée MT/BT comprenant transformateurs industriels, armoires et cellules de coupure, essais de conformité et mise en service documentée.",
      highlights: [
        "Installation MT/BT certifiée",
        "Équipements de haute qualité",
        "Partenariat stratégique SNEL",
        "Essais de conformité et mise en service"
      ]
    },
    {
      id: "proj-2",
      title: "Étude Technique et Planification du Chantier Mimosa",
      location: "Kinshasa, RDC",
      client: "Chantier Mimosa",
      type: "Ingénierie & Planification",
      badge: "Études & Ingénierie",
      image: "assets/images/kks-etude-chantier-mimosa.jpg",
      description: "Analyse approfondie des plans, calculs de dimensionnement, choix des solutions adaptées, organisation optimale et respect strict des règles de sécurité sur le chantier.",
      highlights: [
        "Analyse de plans et calculs d'ingénierie",
        "Planification précise sans imprévus",
        "Sécurité garantie sur tout le chantier",
        "Efficacité et performance durables"
      ]
    },
    {
      id: "proj-3",
      title: "Montage Logette et Tableaux de Distribution",
      location: "Kinshasa, RDC",
      client: "Installation Bâtiment & Tertiaire",
      type: "Distribution & Sécurité",
      badge: "Tableaux & Logettes",
      image: "assets/images/kks-montage-logette.jpg",
      description: "Notre expertise pour des installations sûres et durables : montage de logettes, disjoncteurs généraux, fusibles industriels NT1 250A, voyants de phases et protection renforcée.",
      highlights: [
        "Disjoncteurs et fusibles NT1 250A",
        "Voyants de contrôle et équilibrage",
        "Sécurité et conformité aux normes",
        "Travail soigné et garanti"
      ]
    },
    {
      id: "proj-4",
      title: "Installation Électrique Sous Dalle (Méthodologie Pro)",
      location: "Kinshasa, RDC",
      client: "Ouvrage BTP & Génie Civil",
      type: "Gros Œuvre & BTP",
      badge: "Méthodologie Chantier",
      image: "assets/images/kks-installation-sous-dalle.jpg",
      description: "Pose des conduits ICTA sur ferraillage avant coulage du béton : respect des rayons de courbure (R ≥ 6x Ø), fixation solide, bouchage hermétique et raccordement aux boîtes de dérivation et encastrement.",
      highlights: [
        "Étude du plan et traçage précis",
        "Fixation sur treillis soudé sans écrasement",
        "Bouchage hermétique pré-coulage",
        "Vérification de continuité intégrale"
      ]
    }
  ],

  strengths: [
    {
      num: "01",
      title: "Sécurité & Conformité Normative",
      description: "La sécurité électrique est notre priorité absolue. Nous appliquons rigoureusement les normes de conformité et de protection des personnes et des biens.",
      icon: "shield-check"
    },
    {
      num: "02",
      title: "Travail Soigné et Durable",
      description: "Chaque installation est réalisée avec précision et des composants de haute qualité pour garantir longévité et fiabilité continue.",
      icon: "award"
    },
    {
      num: "03",
      title: "Équipe Qualifiée & Expérimentée",
      description: "Des ingénieurs et techniciens formés, certifiés et équipés d'outillages spécialisés pour intervenir sur tout type de chantier.",
      icon: "users"
    },
    {
      num: "04",
      title: "Intervention Rapide & Disponibilité 24h",
      description: "Une réactivité immédiate à Kinshasa pour vos urgences de dépannage et une planification rigoureuse de vos chantiers.",
      icon: "clock"
    }
  ],

  snelPartnership: {
    title: "Partenariat Stratégique avec la SNEL",
    subtitle: "Société Nationale d'Électricité",
    description: "Sous-traitance qualifiée pour la Société Nationale d'Électricité (SNEL). Accompagnement dans l'exploitation, la maintenance et l'extension du réseau électrique national.",
    items: [
      "Réseaux Moyenne Tension (MT) : Poses & raccordements 15kVA, 20kVA, 30kVA, 32kVA",
      "Réseaux Basse Tension (BT) : Distribution locale, tirage de câbles BT, éclairage public",
      "Compteurs intelligents et certification SNEL",
      "Personnel qualifié : équipes pluridisciplinaires d'ingénieurs et techniciens certifiés"
    ]
  }
};

class KKS_CMS {
  static STORAGE_KEY = 'kks_groupe_electrique_cms_data';

  static getData() {
    try {
      const stored = localStorage.getItem(KKS_CMS.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('CMS localStorage read error, using default data:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_KKS_DATA));
  }

  static saveData(data) {
    try {
      localStorage.setItem(KKS_CMS.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('kks_data_updated', { detail: data }));
      return true;
    } catch (e) {
      console.error('CMS localStorage write error:', e);
      return false;
    }
  }

  static resetToDefault() {
    try {
      localStorage.removeItem(KKS_CMS.STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('kks_data_updated', { detail: DEFAULT_KKS_DATA }));
      return true;
    } catch (e) {
      return false;
    }
  }

  static exportJSON() {
    const data = KKS_CMS.getData();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'kks_data_backup_' + new Date().toISOString().split('T')[0] + '.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  static importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.company && parsed.services && parsed.projects) {
        KKS_CMS.saveData(parsed);
        return { success: true };
      } else {
        return { success: false, error: 'Format JSON invalide ou structure incomplète.' };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

if (typeof window !== 'undefined') {
  window.KKS_CMS = KKS_CMS;
  window.DEFAULT_KKS_DATA = DEFAULT_KKS_DATA;
}
if (typeof global !== 'undefined') {
  global.KKS_CMS = KKS_CMS;
  global.DEFAULT_KKS_DATA = DEFAULT_KKS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KKS_CMS, DEFAULT_KKS_DATA };
}