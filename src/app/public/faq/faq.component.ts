import { Component, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FaqItemComponent } from '../../components/faq-item/faq-item.component';

export type Question = {
  question: string;
  answer: string;
};

@Component({
  selector: 'faq',
  imports: [FaqItemComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styles: ``,
})
export class FAQPage {
  readonly questions = signal<Question[]>([
    {
      question: 'Comment prendre rendez-vous en ligne ?',
      answer:
        "Vous pouvez prendre rendez-vous directement via notre site internet en sélectionnant le service souhaité, la date et l'heure qui vous conviennent. Une confirmation vous sera envoyée par e-mail ou SMS, et vous pourrez gérer votre réservation depuis votre espace client.",
    },
    {
      question: 'Quels services proposez-vous ?',
      answer:
        'Nous offrons une large gamme de services, notamment la vidange, le diagnostic électronique, le changement de pneus, la réparation des freins, l’entretien de la climatisation et bien d’autres prestations. Nos mécaniciens qualifiés sont à votre disposition pour répondre à tous vos besoins en matière d’entretien et de réparation automobile.',
    },
    {
      question: "Puis-je suivre l'avancement des réparations ?",
      answer:
        'Oui, grâce à notre plateforme en ligne, vous pouvez suivre en temps réel l’évolution des réparations de votre véhicule. Vous recevrez également des notifications lorsque des étapes importantes seront franchies, comme la validation du devis ou la fin des travaux.',
    },
    {
      question: 'Quels sont vos horaires d’ouverture ?',
      answer:
        'Notre garage est ouvert du lundi au samedi, de 8h à 18h sans interruption. Nos équipes sont disponibles pour vous accueillir et répondre à toutes vos questions. Pour toute urgence en dehors de ces horaires, vous pouvez nous contacter via notre service de dépannage.',
    },
    {
      question: 'Faut-il payer en avance ?',
      answer:
        'Non, le paiement s’effectue après la réalisation du service. Toutefois, pour certaines interventions nécessitant des pièces spécifiques ou coûteuses, un acompte peut être demandé afin de garantir la commande et la réservation de votre créneau.',
    },
    {
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer:
        'Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal et en espèces directement au garage. Pour les entreprises ou les clients réguliers, nous pouvons également mettre en place des facilités de paiement après étude de votre dossier.',
    },
    {
      question: 'Puis-je annuler un rendez-vous ?',
      answer:
        'Oui, vous pouvez annuler ou reprogrammer votre rendez-vous à tout moment depuis votre espace client en ligne. Nous vous recommandons de le faire au moins 24 heures à l’avance afin d’éviter toute facturation ou pénalité éventuelle.',
    },
    {
      question: 'Offrez-vous des réductions pour abonnés ?',
      answer:
        'Oui, en souscrivant à l’un de nos abonnements, vous bénéficiez de réductions exclusives sur tous nos services, ainsi que d’avantages comme des rendez-vous prioritaires et des diagnostics gratuits. Plus votre abonnement est long, plus les avantages sont intéressants.',
    },
    {
      question: 'Combien de temps dure une vidange ?',
      answer:
        'Une vidange standard prend généralement entre 30 et 45 minutes. Toutefois, si un diagnostic moteur est nécessaire ou si nous devons remplacer d’autres éléments, l’intervention peut durer jusqu’à une heure. Nous vous informerons du délai exact une fois sur place.',
    },
    {
      question: 'Proposez-vous un service de dépannage ?',
      answer:
        'Oui, nous offrons un service de dépannage d’urgence disponible 24h/24 et 7j/7 dans un rayon défini autour de notre garage. En cas de panne, vous pouvez nous contacter et un technicien interviendra rapidement pour vous aider, que ce soit pour un remorquage ou une réparation sur place.',
    },
    {
      question: "Est-ce que vous utilisez des pièces d'origine ?",
      answer:
        'Oui, nous utilisons exclusivement des pièces d’origine ou des pièces de rechange de qualité équivalente, garanties par les fabricants. Cela permet d’assurer la durabilité et la fiabilité de votre véhicule, en respectant les normes des constructeurs.',
    },
    {
      question: 'Comment puis-je contacter un mécanicien ?',
      answer:
        'Vous pouvez contacter nos mécaniciens directement via notre chat en ligne sur le site, par téléphone ou en passant au garage. Pour les abonnés, un service d’assistance prioritaire est disponible pour répondre plus rapidement à toutes vos questions techniques.',
    },
    {
      question: 'Faites-vous la révision complète des véhicules ?',
      answer:
        'Oui, nous proposons des forfaits de révision complète comprenant la vidange, le contrôle des freins, des suspensions, des pneus, des niveaux et bien plus encore. Chaque révision est adaptée à votre véhicule et respecte les préconisations du constructeur.',
    },
    {
      question: 'Puis-je obtenir un devis avant réparation ?',
      answer:
        'Bien sûr, vous pouvez demander un devis en ligne ou directement au garage. Nous analyserons votre demande et vous fournirons une estimation détaillée des coûts et du temps nécessaire pour l’intervention. Le devis est gratuit et sans engagement.',
    },
    {
      question: 'Les réparations sont-elles garanties ?',
      answer:
        'Oui, toutes nos réparations sont couvertes par une garantie de plusieurs mois, selon le type d’intervention. En cas de problème après une réparation, nous nous engageons à vérifier et corriger tout défaut sans frais supplémentaires, selon nos conditions de garantie.',
    },
    {
      question: 'Comment fonctionne l’abonnement ?',
      answer:
        'Nos abonnements vous permettent d’accéder à des réductions exclusives, des services prioritaires et des diagnostics gratuits. Vous pouvez choisir un abonnement mensuel, annuel ou à vie selon vos besoins. Tous les détails sont accessibles dans votre espace client.',
    },
    {
      question: 'Que faire en cas de panne sur la route ?',
      answer:
        'Si vous tombez en panne, contactez immédiatement notre service de dépannage via notre numéro d’urgence. Un technicien sera envoyé pour diagnostiquer la panne et, si possible, effectuer une réparation sur place. Sinon, votre véhicule sera remorqué vers notre garage pour une intervention plus approfondie.',
    },
    {
      question: 'Est-ce que vous faites la recharge de climatisation ?',
      answer:
        'Oui, nous proposons un service de recharge de climatisation, incluant le diagnostic du circuit de refroidissement et la détection des éventuelles fuites. Cela permet de garantir un bon fonctionnement de votre climatisation et d’améliorer votre confort de conduite.',
    },
    {
      question: 'Dois-je apporter mon propre huile moteur ?',
      answer:
        'Non, nous utilisons des huiles moteur de haute qualité, adaptées à chaque type de véhicule et conformes aux recommandations des constructeurs. Nous sélectionnons l’huile en fonction des spécifications de votre moteur pour garantir des performances optimales.',
    },
    {
      question: 'Comment puis-je voir l’historique de mes réparations ?',
      answer:
        'Vous pouvez accéder à l’historique complet de vos réparations en vous connectant à votre espace client sur notre site. Vous y trouverez les détails de chaque intervention, les dates, les coûts et les recommandations d’entretien pour votre véhicule.',
    },
  ]);
}
