import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const PilotRegistrationModal = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const goToCadastro = () => {
    onOpenChange(false);
    navigate('/cadastro');
  };

  const goToLogin = () => {
    onOpenChange(false);
    navigate('/login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="f1-subtitle text-2xl text-white">Acesso de Piloto</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Para manter o cadastro completo e confiavel na apresentacao, usamos um formulario dedicado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Button onClick={goToCadastro} className="w-full" size="lg">
            Cadastrar Piloto
          </Button>
          <Button onClick={goToLogin} variant="outline" className="w-full" size="lg">
            Ja tenho cadastro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PilotRegistrationModal;
