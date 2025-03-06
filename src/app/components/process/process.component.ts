import { Component } from '@angular/core';

@Component({
  selector: 'process',
  imports: [],
  templateUrl: './process.component.html',
})
export class ProcessComponent {
  readonly process = [
    {
      tab: 'Connexion',
      title: 'Créer un compte',
      description:
        'Inscrivez-vous rapidement en renseignant quelques informations essentielles. Une fois connecté, vous accédez à votre espace personnel où vous pouvez gérer vos demandes, suivre vos réparations et consulter l’historique de vos interventions en toute simplicité.',
    },
    {
      tab: 'Abonnement',
      title: 'Choisir un abonnement',
      description:
        'Optez pour un abonnement et bénéficiez d’avantages exclusifs ! Profitez de réductions sur vos réparations, d’un suivi prioritaire et de services supplémentaires pour entretenir votre véhicule en toute sérénité. Un moyen idéal d’économiser du temps et de l’argent.',
    },
    {
      tab: 'Effectuer un devis',
      title: 'Effectuer un devis',
      description:
        'Renseignez les détails de votre véhicule et les réparations souhaitées pour obtenir un devis précis en quelques minutes. Comparez les options et planifiez votre intervention en toute transparence, sans surprise sur les coûts.',
    },
  ];
}
