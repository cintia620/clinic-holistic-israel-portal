
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, EyeOff, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

declare global {
  interface Window {
    Human: any;
  }
}

const BioDigitalHuman: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleSystems, setVisibleSystems] = useState<Set<string>>(new Set());

  // Sistemas anatômicos disponíveis no BioDigital Human
  const anatomicalSystems = [
    { id: 'skeletal', name: 'Sistema Esquelético', color: '#F5F5DC' },
    { id: 'muscular', name: 'Sistema Muscular', color: '#CD5C5C' },
    { id: 'cardiovascular', name: 'Sistema Cardiovascular', color: '#DC143C' },
    { id: 'nervous', name: 'Sistema Nervoso', color: '#FFD700' },
    { id: 'respiratory', name: 'Sistema Respiratório', color: '#87CEEB' },
    { id: 'digestive', name: 'Sistema Digestivo', color: '#DDA0DD' },
    { id: 'urinary', name: 'Sistema Urinário', color: '#F0E68C' },
    { id: 'reproductive', name: 'Sistema Reprodutivo', color: '#FFA07A' },
    { id: 'endocrine', name: 'Sistema Endócrino', color: '#98FB98' },
    { id: 'integumentary', name: 'Sistema Tegumentar', color: '#FFDBAC' }
  ];

  useEffect(() => {
    loadBioDigitalScript();
  }, []);

  const loadBioDigitalScript = () => {
    // Verificar se o script já foi carregado
    if (window.Human) {
      initializeHuman();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://developer.biodigital.com/builds/api/2/human-api.min.js';
    script.async = true;
    script.onload = () => {
      console.log('BioDigital Human API carregado com sucesso');
      initializeHuman();
    };
    script.onerror = () => {
      console.error('Erro ao carregar BioDigital Human API');
      setError('Erro ao carregar o modelo 3D. Verifique sua conexão com a internet.');
      setIsLoading(false);
    };
    document.head.appendChild(script);
  };

  const initializeHuman = () => {
    if (!containerRef.current || !window.Human) {
      setError('Erro na inicialização do container');
      setIsLoading(false);
      return;
    }

    try {
      // Configuração do widget BioDigital Human com sua chave de API
      const human = new window.Human({
        container: containerRef.current,
        apiKey: '87ca47d71f065909cc7c2e40ba8e50df2243a0d0', // Sua chave de API
        background: '#ffffff',
        ui: {
          nav: true,
          fullscreen: true,
          tools: true,
          info: true
        },
        camera: {
          position: { x: 0, y: 0, z: 10 },
          target: { x: 0, y: 0, z: 0 }
        },
        loading: {
          logo: false
        }
      });

      human.on('human.ready', () => {
        console.log('BioDigital Human inicializado com sucesso');
        humanRef.current = human;
        setIsLoading(false);
        
        // Carregar modelo padrão do corpo humano
        loadDefaultModel();
        
        // Inicializar sistemas visíveis
        const systems = anatomicalSystems.map(sys => sys.id);
        setVisibleSystems(new Set(systems));
      });

      human.on('human.error', (error: any) => {
        console.error('Erro no BioDigital Human:', error);
        setError('Erro ao inicializar o modelo 3D');
        setIsLoading(false);
      });

    } catch (err) {
      console.error('Erro na inicialização:', err);
      setError('Erro ao inicializar o modelo 3D');
      setIsLoading(false);
    }
  };

  const loadDefaultModel = () => {
    if (!humanRef.current) return;

    // Carregar modelo anatômico padrão
    humanRef.current.load({
      model: 'production/maleAdult/maleFull.json',
      callback: () => {
        console.log('Modelo carregado com sucesso');
        // Configurar posição inicial
        humanRef.current.camera.setPosition({ x: 0, y: 0, z: 10 });
        humanRef.current.camera.setTarget({ x: 0, y: 0, z: 0 });
      }
    });
  };

  const toggleSystem = (systemId: string) => {
    if (!humanRef.current) return;

    const newVisibleSystems = new Set(visibleSystems);
    
    if (visibleSystems.has(systemId)) {
      newVisibleSystems.delete(systemId);
      // Ocultar sistema
      humanRef.current.show({ objects: [systemId], show: false });
    } else {
      newVisibleSystems.add(systemId);
      // Mostrar sistema
      humanRef.current.show({ objects: [systemId], show: true });
    }
    
    setVisibleSystems(newVisibleSystems);
  };

  const resetView = () => {
    if (!humanRef.current) return;
    humanRef.current.camera.setPosition({ x: 0, y: 0, z: 10 });
    humanRef.current.camera.setTarget({ x: 0, y: 0, z: 0 });
  };

  const zoomIn = () => {
    if (!humanRef.current) return;
    humanRef.current.camera.zoom(0.8);
  };

  const zoomOut = () => {
    if (!humanRef.current) return;
    humanRef.current.camera.zoom(1.2);
  };

  if (error) {
    return (
      <Card className="h-[700px] flex items-center justify-center">
        <CardContent className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Erro ao Carregar Modelo</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="h-[700px] relative">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Modelo Anatômico BioDigital Human</CardTitle>
              <CardDescription>
                Modelo 3D médico interativo com precisão anatômica
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetView}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full p-0 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Carregando modelo anatômico...</p>
              </div>
            </div>
          )}
          <div 
            ref={containerRef} 
            className="w-full h-full"
            style={{ minHeight: '600px' }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sistemas Anatômicos</CardTitle>
          <CardDescription>
            Clique para mostrar/ocultar sistemas específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {anatomicalSystems.map((system) => (
              <Button
                key={system.id}
                variant={visibleSystems.has(system.id) ? "default" : "outline"}
                className="justify-between h-auto p-3"
                onClick={() => toggleSystem(system.id)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: system.color }}
                  />
                  <span className="text-sm">{system.name}</span>
                </div>
                {visibleSystems.has(system.id) ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BioDigitalHuman;
