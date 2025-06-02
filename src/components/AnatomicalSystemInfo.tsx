
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  Bone, 
  Activity, 
  Lungs, 
  Stomach, 
  Kidney, 
  Baby, 
  Zap, 
  User 
} from 'lucide-react';

interface AnatomicalSystemInfoProps {
  selectedSystem: string | null;
}

const getSystemInfo = (systemId: string) => {
  const systemsData: Record<string, {
    icon: React.ReactNode;
    name: string;
    description: string;
    structures: string[];
    functions: string[];
    disorders: string[];
    facts: string[];
  }> = {
    skeletal: {
      icon: <Bone className="w-6 h-6" />,
      name: 'Sistema Esquelético',
      description: 'Fornece suporte estrutural, protege órgãos vitais e permite movimento através das articulações.',
      structures: [
        '206 ossos no adulto',
        'Cartilagens articulares',
        'Ligamentos e tendões',
        'Medula óssea (vermelha e amarela)',
        'Periósteo - membrana óssea'
      ],
      functions: [
        'Suporte corporal e postura',
        'Proteção de órgãos vitais',
        'Produção de células sanguíneas',
        'Armazenamento de minerais (Ca²⁺, PO₄³⁻)',
        'Movimento e locomoção'
      ],
      disorders: [
        'Osteoporose - perda de densidade óssea',
        'Artrite - inflamação articular',
        'Fraturas e luxações',
        'Escoliose - curvatura anormal da coluna',
        'Osteomielite - infecção óssea'
      ],
      facts: [
        'O fêmur é o osso mais longo (48cm)',
        'Ossos se renovam completamente a cada 10 anos',
        'Produzem 2,6 milhões de células vermelhas/segundo',
        'Contêm 99% do cálcio corporal'
      ]
    },
    muscular: {
      icon: <Activity className="w-6 h-6" />,
      name: 'Sistema Muscular',
      description: 'Responsável pelo movimento, postura e produção de calor através da contração muscular.',
      structures: [
        '640+ músculos esqueléticos',
        'Fibras musculares (tipo I e II)',
        'Tendões e aponeuroses',
        'Junções neuromusculares',
        'Sarcômeros - unidades contráteis'
      ],
      functions: [
        'Movimento voluntário e involuntário',
        'Manutenção da postura',
        'Termogênese - produção de calor',
        'Proteção de órgãos internos',
        'Circulação sanguínea e linfática'
      ],
      disorders: [
        'Distrofia muscular - degeneração',
        'Miastenia gravis - fraqueza muscular',
        'Fibromialgia - dor muscular crônica',
        'Cãibras e espasmos musculares',
        'Atrofia por desuso'
      ],
      facts: [
        'Representam 40-50% do peso corporal',
        'Glúteo máximo é o maior músculo',
        'Músculos faciais permitem 10.000 expressões',
        'Coração bate 100.000 vezes/dia'
      ]
    },
    cardiovascular: {
      icon: <Heart className="w-6 h-6" />,
      name: 'Sistema Cardiovascular',
      description: 'Transporta oxigênio, nutrientes e resíduos através do sangue bombeado pelo coração.',
      structures: [
        'Coração - 4 câmaras (300g)',
        '100.000 km de vasos sanguíneos',
        'Artérias, veias e capilares',
        '5 litros de sangue circulante',
        'Válvulas cardíacas (mitral, tricúspide, aórtica, pulmonar)'
      ],
      functions: [
        'Transporte de O₂ e CO₂',
        'Distribuição de nutrientes',
        'Remoção de resíduos metabólicos',
        'Regulação da temperatura corporal',
        'Transporte hormonal'
      ],
      disorders: [
        'Infarto do miocárdio',
        'Hipertensão arterial',
        'Arritmias cardíacas',
        'Insuficiência cardíaca',
        'Aterosclerose'
      ],
      facts: [
        'Bombeia 7.000 litros/dia',
        'Pressão sistólica normal: 120mmHg',
        'Sangue completa circuito em 60 segundos',
        'Capilares têm apenas 5 micrômetros'
      ]
    },
    nervous: {
      icon: <Brain className="w-6 h-6" />,
      name: 'Sistema Nervoso',
      description: 'Controla e coordena funções corporais através de impulsos elétricos e químicos.',
      structures: [
        'Encéfalo - 86 bilhões de neurônios',
        'Medula espinhal - 31 segmentos',
        'Nervos periféricos - 43 pares',
        'Sinapses - 100 trilhões',
        'Células gliais - suporte neuronal'
      ],
      functions: [
        'Processamento de informações sensoriais',
        'Controle motor voluntário e reflexo',
        'Funções cognitivas superiores',
        'Regulação autonômica',
        'Memória e aprendizagem'
      ],
      disorders: [
        'Alzheimer - demência neurodegenerativa',
        'Parkinson - distúrbio motor',
        'Esclerose múltipla - desmielinização',
        'AVC - acidente vascular cerebral',
        'Epilepsia - atividade elétrica anormal'
      ],
      facts: [
        'Consome 20% da energia corporal',
        'Impulsos viajam a 120 m/s',
        'Produz 25 watts de energia',
        'Processa 11 milhões bits/segundo'
      ]
    },
    respiratory: {
      icon: <Lungs className="w-6 h-6" />,
      name: 'Sistema Respiratório',
      description: 'Realiza trocas gasosas entre o ar atmosférico e o sangue nos alvéolos pulmonares.',
      structures: [
        'Vias aéreas - nariz, faringe, laringe',
        'Traqueia e brônquios principais',
        'Pulmões - 300 milhões de alvéolos',
        'Diafragma - músculo respiratório',
        'Pleuras - membranas protetoras'
      ],
      functions: [
        'Ventilação pulmonar (inspiração/expiração)',
        'Hematose alveolar - troca O₂/CO₂',
        'Regulação do pH sanguíneo',
        'Fonação e comunicação',
        'Filtração e umidificação do ar'
      ],
      disorders: [
        'Asma - broncoconstrição',
        'DPOC - doença pulmonar obstrutiva',
        'Pneumonia - infecção pulmonar',
        'Tuberculose - infecção por bacilo',
        'Embolia pulmonar'
      ],
      facts: [
        'Respiramos 22.000 vezes/dia',
        'Superfície alveolar: 70 m²',
        'Capacidade pulmonar: 6 litros',
        'Ar inspirado contém 21% O₂'
      ]
    },
    digestive: {
      icon: <Stomach className="w-6 h-6" />,
      name: 'Sistema Digestivo',
      description: 'Digere alimentos e absorve nutrientes essenciais para o metabolismo celular.',
      structures: [
        'Tubo digestivo - 9 metros',
        'Estômago - capacidade 1,5L',
        'Intestino delgado - 6m, vilosidades',
        'Fígado - maior glândula (1,5kg)',
        'Pâncreas - enzimas digestivas'
      ],
      functions: [
        'Digestão mecânica e química',
        'Absorção de nutrientes',
        'Eliminação de resíduos',
        'Produção de enzimas digestivas',
        'Síntese de vitaminas (K, B12)'
      ],
      disorders: [
        'Úlcera péptica - lesão mucosa',
        'Doença de Crohn - inflamação intestinal',
        'Hepatite - inflamação hepática',
        'Cálculos biliares',
        'Síndrome do intestino irritável'
      ],
      facts: [
        'Produz 1,5L de saliva/dia',
        'Suco gástrico tem pH 1,5-2',
        'Absorve 9L de líquidos/dia',
        'Trânsito intestinal: 24-72h'
      ]
    },
    urinary: {
      icon: <Kidney className="w-6 h-6" />,
      name: 'Sistema Urinário',
      description: 'Filtra resíduos do sangue e regula o equilíbrio hidroeletrolítico corporal.',
      structures: [
        'Rins - 1 milhão de néfrons cada',
        'Ureteres - tubos coletores',
        'Bexiga - capacidade 500ml',
        'Uretra - via de eliminação',
        'Glomérulos - filtração sanguínea'
      ],
      functions: [
        'Filtração glomerular - 180L/dia',
        'Reabsorção tubular seletiva',
        'Regulação do pH sanguíneo',
        'Controle da pressão arterial',
        'Produção de eritropoietina'
      ],
      disorders: [
        'Insuficiência renal crônica',
        'Cálculos renais - nefrolitíase',
        'Infecção urinária - cistite',
        'Glomerulonefrite - inflamação glomerular',
        'Incontinência urinária'
      ],
      facts: [
        'Filtram 1.700L sangue/dia',
        'Produzem 1-2L urina/dia',
        'Néfrons medem 3cm cada',
        'Reabsorvem 99% do filtrado'
      ]
    }
  };

  return systemsData[systemId] || null;
};

const AnatomicalSystemInfo: React.FC<AnatomicalSystemInfoProps> = ({ 
  selectedSystem 
}) => {
  if (!selectedSystem) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
          <CardDescription>
            Selecione um sistema anatômico para ver informações detalhadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            Clique em um sistema para acessar dados médicos especializados
          </div>
        </CardContent>
      </Card>
    );
  }

  const systemInfo = getSystemInfo(selectedSystem);
  
  if (!systemInfo) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Sistema não encontrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-h-[600px] overflow-y-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          {systemInfo.icon}
          <div>
            <CardTitle className="text-xl">{systemInfo.name}</CardTitle>
            <CardDescription className="mt-2">
              {systemInfo.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            Estruturas Anatômicas
          </h4>
          <ul className="space-y-2">
            {systemInfo.structures.map((structure, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>{structure}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            Funções Fisiológicas
          </h4>
          <ul className="space-y-2">
            {systemInfo.functions.map((func, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>{func}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600" />
            Distúrbios Comuns
          </h4>
          <ul className="space-y-2">
            {systemInfo.disorders.map((disorder, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>{disorder}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-purple-800">Dados Médicos</h4>
          <div className="grid gap-2">
            {systemInfo.facts.map((fact, index) => (
              <Badge key={index} variant="secondary" className="text-xs p-2 justify-start">
                {fact}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnatomicalSystemInfo;
