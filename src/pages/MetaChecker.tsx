import { useEffect, useState } from 'react';
import { NFC } from '@ionic-native/nfc';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const MetaChecker = () => {
  const [info, setInfo] = useState('TEST');
  useEffect(() => {
    NFC.addNdefListener(
      (nfcEvent: any) => {
        setInfo(JSON.stringify(nfcEvent));
      },
      function () {
        console.log('Listening for NDEF Tags.');
      }
    );
  });
  return (
    <IonPage id="meta-checker">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Meta Checker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>{info}</div>
      </IonContent>
    </IonPage>
  );
};

export default MetaChecker;
