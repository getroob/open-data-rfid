import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonNavLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { analytics, search } from 'ionicons/icons';
import './Home.css';
import LogisticsTracking from './LogisticsTracking';
import MetaChecker from './MetaChecker';
import { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.NFC).then(
      (result) => console.log('Has permission?', result.hasPermission),
      (err) => AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.NFC)
    );
  }, []);
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
