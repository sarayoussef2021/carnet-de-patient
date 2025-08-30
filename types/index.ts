export interface Patient {
  prenom: string;
  nom: string;
  dateNaissance: string;
  numeroSecu: string;
  groupeSanguin: string;
  medecinTraitant: string;
}

export interface RendezVous {
  id: number;
  medecin: string;
  specialite: string;
  date: string;
  heure: string;
  lieu: string;
  statut: 'a_venir' | 'passe';
  type: string;
  notes: string;
}

export interface Antecedent {
  id: number;
  type: string;
  description: string;
  date: string;
  medecin: string;
}

export interface Allergie {
  id: number;
  substance: string;
  type: string;
  severite: string;
  reaction: string;
  dateDecouverte: string;
}

export interface Traitement {
  id: number;
  medicament: string;
  posologie: string;
  indication: string;
  dateDebut: string;
  dateFin: string | null;
  medecin: string;
  statut: string;
}

export interface Vaccination {
  id: number;
  vaccin: string;
  date: string;
  rappel: string;
  lieu: string;
}

export interface Recommandation {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  icone: string;
  priorite: 'haute' | 'moyenne' | 'basse';
}

export interface Categorie {
  nom: string;
  couleur: string;
  icone: string;
}

export interface DossierMedical {
  patient: Patient;
  antecedents: Antecedent[];
  allergies: Allergie[];
  traitements: Traitement[];
  vaccinations: Vaccination[];
}
