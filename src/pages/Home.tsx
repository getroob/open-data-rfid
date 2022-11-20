import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonNavLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { analytics, search } from 'ionicons/icons';
import './Home.css';
import LogisticsTracking from './LogisticsTracking';
import MetaChecker from './MetaChecker';

const Home: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <>
          <IonNavLink routerDirection="forward" component={() => <LogisticsTracking />}>
            <IonButton fill="outline" expand="block" className="routing-button">
              <div>
                <IonIcon slot="start" icon={analytics} size="large"></IonIcon>
                <IonLabel class="button-label">Logistics Tracking</IonLabel>
              </div>
            </IonButton>
          </IonNavLink>
          <IonNavLink routerDirection="forward" component={() => <MetaChecker />}>
            <IonButton fill="outline" expand="block" className="routing-button">
              <div>
                <IonIcon slot="start" icon={search} size="large"></IonIcon>
                <IonLabel class="button-label">Meta Checker</IonLabel>
              </div>
            </IonButton>
          </IonNavLink>
        </>
      </IonContent>
    </IonPage>
  );
};

export default Home;
