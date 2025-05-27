import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Zap, Activity, Bone, Eye } from 'lucide-react';
import { BodyPart } from '@/pages/HumanBody';

interface BodyPartInfoProps {
  selectedPart: BodyPart | null;
}

const getBodyPartDetails = (part: BodyPart) => {
  const details: Record<string, {
    icon: React.ReactNode;
    anatomy: string[];
    physiology: string[];
    functions: string[];
    healthTips: string[];
    relatedSystems: string[];
    medicalTerms: string[];
  }> = {
    head: {
      icon: <Brain className="w-5 h-5" />,
      anatomy: [
        'Neurocranium - 8 ossos protegendo o encéfalo',
        'Viscerocranium - 14 ossos formando a face',
        'Encéfalo - 1,4 kg, 86 bilhões de neurônios',
        'Meninges - dura-máter, aracnoide, pia-máter',
        'Líquor cefalorraquidiano - 150ml circulantes'
      ],
      physiology: [
        'Metabolismo cerebral: 20% do consumo de O₂ corporal',
        'Barreira hematoencefálica seletiva',
        'Autorregulação do fluxo sanguíneo cerebral',
        'Plasticidade sináptica e neurogênese',
        'Ciclos circadianos hipotalâmicos'
      ],
      functions: [
        'Processamento cognitivo superior',
        'Controle motor voluntário e reflexo',
        'Integração sensorial multimodal',
        'Regulação homeostática vital',
        'Memória declarativa e procedimental'
      ],
      healthTips: [
        'Neuroproteção com antioxidantes (vitamina E, C)',
        'Exercício aeróbico para neurogênese',
        'Sono REM adequado (25% do sono total)',
        'Estimulação cognitiva contínua',
        'Hidratação cerebral (2-3L água/dia)'
      ],
      relatedSystems: [
        'Sistema Nervoso Central',
        'Sistema Vascular Cerebral',
        'Sistema Endócrino Hipotalâmico',
        'Sistema Sensorial Integrado'
      ],
      medicalTerms: [
        'Córtex cerebral - substância cinzenta',
        'Substância branca - fibras mielinizadas',
        'Ventrículos cerebrais - cavidades LCR',
        'Tronco encefálico - mesencéfalo, ponte, bulbo'
      ]
    },
    chest: {
      icon: <Heart className="w-5 h-5" />,
      anatomy: [
        'Caixa torácica - 12 pares de costelas, esterno',
        'Coração - 4 câmaras, 300g, válvulas semilunares',
        'Pulmões - 300 milhões de alvéolos cada',
        'Mediastino - espaço entre os pulmões',
        'Diafragma - principal músculo respiratório'
      ],
      physiology: [
        'Débito cardíaco: 5L/min em repouso',
        'Ventilação pulmonar: 12-20 ciclos/min',
        'Pressão arterial sistólica/diastólica',
        'Hematose alveolar - troca O₂/CO₂',
        'Retorno venoso e pressão intratorácica'
      ],
      functions: [
        'Bombeamento sanguíneo sistêmico e pulmonar',
        'Oxigenação tecidual periférica',
        'Remoção de CO₂ metabólico',
        'Regulação do pH sanguíneo',
        'Distribuição de nutrientes celulares'
      ],
      healthTips: [
        'Exercício cardiovascular 150min/semana',
        'Dieta rica em ômega-3 EPA/DHA',
        'Cessação tabágica completa',
        'Controle pressórico <130/80 mmHG',
        'Técnicas de respiração diafragmática'
      ],
      relatedSystems: [
        'Sistema Cardiovascular',
        'Sistema Respiratório',
        'Sistema Linfático Torácico',
        'Sistema Nervoso Autônomo'
      ],
      medicalTerms: [
        'Miocárdio - músculo cardíaco estriado',
        'Pericárdio - membrana cardíaca protetora',
        'Pleura - membrana pulmonar dupla',
        'Surfactante - reduz tensão superficial alveolar'
      ]
    },
    abdomen: {
      icon: <Activity className="w-5 h-5" />,
      anatomy: [
        'Cavidade peritoneal - espaço abdominal',
        'Fígado - maior glândula, 1,5kg, 8 segmentos',
        'Intestino delgado - 6m, duodeno/jejuno/íleo',
        'Rim - 1 milhão néfrons cada, filtração',
        'Pâncreas - função endócrina e exócrina'
      ],
      physiology: [
        'Filtração glomerular: 120ml/min',
        'Produção bile: 500-1000ml/dia',
        'Absorção intestinal: 8-10L líquidos/dia',
        'Gliconeogênese hepática',
        'Equilíbrio ácido-base renal'
      ],
      functions: [
        'Digestão enzimática complexa',
        'Absorção de macro e micronutrientes',
        'Desintoxicação hepática metabólica',
        'Regulação hidroeletrolítica',
        'Síntese proteica e metabolismo'
      ],
      healthTips: [
        'Hidratação adequada 35ml/kg/dia',
        'Fibras alimentares 25-35g/dia',
        'Probióticos para microbiota intestinal',
        'Jejum intermitente controlado',
        'Redução álcool <14 unidades/semana'
      ],
      relatedSystems: [
        'Sistema Digestório',
        'Sistema Urinário',
        'Sistema Hepático-Biliar',
        'Sistema Endócrino Pancreático'
      ],
      medicalTerms: [
        'Hepatócitos - células hepáticas funcionais',
        'Glomérulo - rede capilar renal',
        'Peristaltismo - ondas contráteis intestinais',
        'Microbioma - flora bacteriana intestinal'
      ]
    },
    leftArm: {
      icon: <Zap className="w-5 h-5" />,
      anatomy: [
        'Úmero - osso do braço, cavidade glenoidal',
        'Rádio e ulna - ossos do antebraço',
        'Carpo - 8 ossos do punho',
        'Metacarpos e falanges - 19 ossos da mão',
        'Músculos: bíceps, tríceps, flexores, extensores'
      ],
      physiology: [
        'Contração muscular actina-miosina',
        'Inervação plexo braquial C5-T1',
        'Vascularização artéria braquial',
        'Propriocepção articular',
        'Coordenação córtico-espinhal'
      ],
      functions: [
        'Preensão palmar precisa',
        'Manipulação objeto fino',
        'Força e resistência muscular',
        'Coordenação motora fina',
        'Expressão gestual comunicativa'
      ],
      healthTips: [
        'Fortalecimento excêntrico progressivo',
        'Alongamento fascial miofascial',
        'Ergonomia postural no trabalho',
        'Crioterapia pós-exercício intenso',
        'Suplementação proteica 1,2-2g/kg/dia'
      ],
      relatedSystems: [
        'Sistema Músculo-Esquelético',
        'Sistema Nervoso Periférico',
        'Sistema Vascular Periférico',
        'Sistema Articular Sinovial'
      ],
      medicalTerms: [
        'Sarcômero - unidade contrátil muscular',
        'Sinapse neuromuscular - junção nervosa',
        'Cartilagem articular - superfície articular',
        'Líquido sinovial - lubrificação articular'
      ]
    },
    rightArm: {
      icon: <Zap className="w-5 h-5" />,
      anatomy: [
        'Úmero - osso do braço, cavidade glenoidal',
        'Rádio e ulna - ossos do antebraço',
        'Carpo - 8 ossos do punho',
        'Metacarpos e falanges - 19 ossos da mão',
        'Músculos: bíceps, tríceps, flexores, extensores'
      ],
      physiology: [
        'Contração muscular actina-miosina',
        'Inervação plexo braquial C5-T1',
        'Vascularização artéria braquial',
        'Propriocepção articular',
        'Coordenação córtico-espinhal'
      ],
      functions: [
        'Preensão palmar precisa',
        'Manipulação objeto fino',
        'Força e resistência muscular',
        'Coordenação motora fina',
        'Expressão gestual comunicativa'
      ],
      healthTips: [
        'Fortalecimento excêntrico progressivo',
        'Alongamento fascial miofascial',
        'Ergonomia postural no trabalho',
        'Crioterapia pós-exercício intenso',
        'Suplementação proteica 1,2-2g/kg/dia'
      ],
      relatedSystems: [
        'Sistema Músculo-Esquelético',
        'Sistema Nervoso Periférico',
        'Sistema Vascular Periférico',
        'Sistema Articular Sinovial'
      ],
      medicalTerms: [
        'Sarcômero - unidade contrátil muscular',
        'Sinapse neuromuscular - junção nervosa',
        'Cartilagem articular - superfície articular',
        'Líquido sinovial - lubrificação articular'
      ]
    },
    leftLeg: {
      icon: <Bone className="w-5 h-5" />,
      anatomy: [
        'Fêmur - osso mais longo, cabeça femoral',
        'Tíbia e fíbula - ossos da perna',
        'Patela - osso sesamoide do joelho',
        'Tarso, metatarso, falanges - 26 ossos do pé',
        'Músculos: quadríceps, isquiotibiais, gastrocnêmio'
      ],
      physiology: [
        'Sustentação peso corporal 2-3x durante marcha',
        'Propriocepção podal e equilíbrio',
        'Retorno venoso contra gravidade',
        'Biomecânica da marcha',
        'Absorção impacto articular'
      ],
      functions: [
        'Locomoção bípede eficiente',
        'Estabilidade postural dinâmica',
        'Propulsão e desaceleração',
        'Absorção energia cinética',
        'Manutenção centro gravidade'
      ],
      healthTips: [
        'Fortalecimento glúteo médio/máximo',
        'Propriocepção em superfícies instáveis',
        'Calçado biomecânico adequado',
        'Progressão carga treino 10%/semana',
        'Recuperação ativa entre sessões'
      ],
      relatedSystems: [
        'Sistema Locomotor',
        'Sistema Venoso de Retorno',
        'Sistema Vestibular Equilíbrio',
        'Sistema Fascial Profundo'
      ],
      medicalTerms: [
        'Cartilagem meniscal - amortecimento joelho',
        'Ligamentos cruzados - estabilidade',
        'Fáscia plantar - suporte arco pé',
        'Bomba muscular - retorno venoso'
      ]
    },
    rightLeg: {
      icon: <Bone className="w-5 h-5" />,
      anatomy: [
        'Fêmur - osso mais longo, cabeça femoral',
        'Tíbia e fíbula - ossos da perna',
        'Patela - osso sesamoide do joelho',
        'Tarso, metatarso, falanges - 26 ossos do pé',
        'Músculos: quadríceps, isquiotibiais, gastrocnêmio'
      ],
      physiology: [
        'Sustentação peso corporal 2-3x durante marcha',
        'Propriocepção podal e equilíbrio',
        'Retorno venoso contra gravidade',
        'Biomecânica da marcha',
        'Absorção impacto articular'
      ],
      functions: [
        'Locomoção bípede eficiente',
        'Estabilidade postural dinâmica',
        'Propulsão e desaceleração',
        'Absorção energia cinética',
        'Manutenção centro gravidade'
      ],
      healthTips: [
        'Fortalecimento glúteo médio/máximo',
        'Propriocepção em superfícies instáveis',
        'Calçado biomecânico adequado',
        'Progressão carga treino 10%/semana',
        'Recuperação ativa entre sessões'
      ],
      relatedSystems: [
        'Sistema Locomotor',
        'Sistema Venoso de Retorno',
        'Sistema Vestibular Equilíbrio',
        'Sistema Fascial Profundo'
      ],
      medicalTerms: [
        'Cartilagem meniscal - amortecimento joelho',
        'Ligamentos cruzados - estabilidade',
        'Fáscia plantar - suporte arco pé',
        'Bomba muscular - retorno venoso'
      ]
    }
  };

  return details[part.id] || {
    icon: <Activity className="w-5 h-5" />,
    anatomy: [],
    physiology: [],
    functions: [],
    healthTips: [],
    relatedSystems: [],
    medicalTerms: []
  };
};

const BodyPartInfo: React.FC<BodyPartInfoProps> = ({ selectedPart }) => {
  if (!selectedPart) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atlas Médico Detalhado</CardTitle>
          <CardDescription>Selecione uma estrutura anatômica para visualizar informações médicas especializadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            Clique em uma região do corpo para acessar dados anatômicos e fisiológicos precisos
          </div>
        </CardContent>
      </Card>
    );
  }

  const details = getBodyPartDetails(selectedPart);

  return (
    <Card className="max-h-[600px] overflow-y-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          {details.icon}
          <CardTitle className="text-lg">{selectedPart.nameHe}</CardTitle>
        </div>
        <CardDescription className="text-sm">{selectedPart.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-sm text-blue-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            Anatomia Estrutural:
          </h4>
          <ul className="text-xs space-y-2">
            {details.anatomy.map((item, index) => (
              <li key={index} className="flex items-start gap-2 pl-2">
                <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm text-green-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            Fisiologia Funcional:
          </h4>
          <ul className="text-xs space-y-2">
            {details.physiology.map((process, index) => (
              <li key={index} className="flex items-start gap-2 pl-2">
                <div className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{process}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm text-purple-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-600" />
            Funções Primárias:
          </h4>
          <ul className="text-xs space-y-2">
            {details.functions.map((func, index) => (
              <li key={index} className="flex items-start gap-2 pl-2">
                <div className="w-1 h-1 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{func}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm text-orange-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-600" />
            Recomendações Médicas:
          </h4>
          <ul className="text-xs space-y-2">
            {details.healthTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 pl-2">
                <div className="w-1 h-1 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm text-indigo-800">Terminologia Médica:</h4>
          <div className="grid grid-cols-1 gap-2">
            {details.medicalTerms.map((term, index) => (
              <div key={index} className="bg-indigo-50 p-2 rounded text-xs">
                {term}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Sistemas Relacionados:</h4>
          <div className="flex flex-wrap gap-1">
            {details.relatedSystems.map((system, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {system}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyPartInfo;
