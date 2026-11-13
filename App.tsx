
import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

type Evenement = {
  id: string;
  Titre: string;
  Categorie: string;
  Capacite: number;
  Inscrits: number;
};

const evenements = [
  { id: 'E01', Titre: "Atelier React", Categorie: "Atelier", Capacite: 25, Inscrits: 25 },
  { id: 'E02', Titre: "Conference IA", Categorie: "Conference", Capacite: 70, Inscrits: 52 },
  { id: 'E03', Titre: "Securite mobile", Categorie: "Atelier", Capacite: 20, Inscrits: 17 },
  { id: 'E04', Titre: "Design UI", Categorie: "Atelier", Capacite: 18, Inscrits: 9 },
  { id: 'E05', Titre: "Forum projets", Categorie: "Rencontre", Capacite: 50, Inscrits: 49 },
  { id: 'E06', Titre: "Decouverte Git", Categorie: "Atelier", Capacite: 24, Inscrits: 24 },
];

function placesRestant(e: Evenement): number {
  if (e.Capacite >= e.Inscrits) {
    return e.Capacite - e.Inscrits;
  } else {
    return 0;
  }
}

function statutEvenement(e: Evenement): string {
  const r = placesRestant(e);
  if (r === 0) {
    return "complet";
  } else if (r >= 1 && r <= 3) {
    return "presque complet";
  } else {
    return "Ouvert";
  }
}

const total = evenements.length;
console.log(total);

const Complet = evenements.filter((e: Evenement) =>
  placesRestant(e) === 0
);
console.log(Complet.length);

const avecplace = evenements.filter((e: Evenement) =>
  placesRestant(e) > 0
);
console.log(avecplace.length);

const totalePlace = evenements.reduce(
  (somme, e: Evenement) => somme + placesRestant(e), 0
);
console.log(totalePlace);

const atelierDispo = evenements.filter((e: Evenement) =>
  e.Categorie === "Atelier" && placesRestant(e) > 0
);
console.log(atelierDispo.length);

type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = "green";

  if (statut === "complet") {
    couleur = "red";
  } else if (statut === "presque complet") {
    couleur = "orange";
  }

  return (
    <Text style={{ color: couleur }}>{statut}</Text>
  );
}

type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View>
      <Text>{evenement.Titre}</Text>
      <Text>{evenement.Categorie}</Text>
      <Text>Places restantes : {placesRestant(evenement)}</Text>
      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}

type BlocStatistiqueProps = {
  libelle: string;
  valeur: number;
};

function BlocStatistique({ libelle, valeur }: BlocStatistiqueProps) {
  return (
    <View>
      <Text>{libelle}</Text>
      <Text>{valeur}</Text>
    </View>
  );
}

const mode = 'tous';

const evenementsAffiches = mode === 'tous'
  ? evenements
  : evenements.filter((e: Evenement) =>
      e.Categorie === 'Atelier' && placesRestant(e) > 0
    );

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>CampusAgenda</Text>
      <Text style={styles.sousTitre}>Événements du campus</Text>

      <View style={styles.statistiques}>
        <BlocStatistique libelle="Événements" valeur={total} />
        <BlocStatistique libelle="Places libres" valeur={totalePlace} />
        <BlocStatistique libelle="Ateliers disponibles" valeur={atelierDispo.length} />
        <BlocStatistique libelle="Événements complets" valeur={Complet.length} />
      </View>

      <Text style={styles.sectionTitre}>
        Tous les événements
      </Text>

      <FlatList
        data={evenementsAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <Text>Aucun événement disponible.</Text>
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F5F9',
  },

  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  sousTitre: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
  },

  statistiques: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    gap: 12,
  },

  sectionTitre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 25,
    marginBottom: 15,
  },

  carte: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  titreCarte: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },

  texteCarte: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 5,
  },

  badge: {
    fontWeight: 'bold',
    marginTop: 8,
  },

  blocStatistique: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  valeurStatistique: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  libelleStatistique: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 5,
  },
});
