export type OccurrenceData = {
  id: number;
  registered_at?: string;
  local: string;
  occurrence_type: number;
  km: number;
  user_id: number;
  _occurrence_type?: string;
};

export type Occurrence = {
  id: number;
  registered_at: string;
  local: string;
  occurrence_type: number;
  km: number;
  user_id: number;
};

export type OccurrenceCreate = {
  local: string;
  registered_at?: string;
  occurrence_type: number;
  km: number;
  user_id: number;
};

export const TYPES = [
  '',
  'Atropelamento',
  'Deslizamento',
  'Colisão frontal',
  'Capotagem',
  'Saída de pista',
  'Batida em objeto fixo',
  'Veículo avariado',
  'Colisão com motocicletas',
  'Colisão no mesmo sentido ou transversal',
  'Construção',
];

export const TYPES_BY_OCCURENCE = [
  { occurrence_type: 1, description: 'Atropelamento' },
  { occurrence_type: 2, description: 'Deslizamento' },
  { occurrence_type: 3, description: 'Colisão frontal' },
  { occurrence_type: 4, description: 'Capotagem' },
  { occurrence_type: 5, description: 'Saída de pista' },
  { occurrence_type: 6, description: 'Batida em objeto fixo' },
  { occurrence_type: 7, description: 'Veículo avariado' },
  { occurrence_type: 8, description: 'Colisão com motocicletas' },
  {
    occurrence_type: 9,
    description: 'Colisão no mesmo sentido ou transversal',
  },
  { occurrence_type: 10, description: 'Construção' },
];

export const MAP_ICONS = [
  '0',
  'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/purple-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/purple-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
  'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
];
