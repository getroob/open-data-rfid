/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { informationCircle, search } from 'ionicons/icons';
import Airtable from 'airtable';
import axios from 'axios';

const MetaChecker = () => {
  const testMac = '04:13:74:66:13:5d:80';
  const [tagContent, setTagContent] = useState('test');
  const [productDetails, setProductDetails] = useState<any>(null);
  const airtable = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_TOKEN }).base('app6aXPMAPPizG18I');

  useEffect(() => {
    if (typeof nfc !== 'undefined') {
      nfc.addTagDiscoveredListener(onNfc);
    } else if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          console.log('Scan started successfully.');
          ndef.onreadingerror = () => {
            console.log('Cannot read data from the NFC tag. Try another one?');
          };
          ndef.onreading = (event: any) => {
            setTagContent(event.serialNumber);
          };
        })
        .catch((error: any) => {
          console.log(`Error! Scan failed to start: ${error}.`);
        });
    }
  }, []);

  useEffect(() => {
    if (tagContent) {
      axios.get('/Transfers').then((res) => {
        airtable('Transfers')
          .select({
            filterByFormula: `{RFID ID} = "${tagContent}"`,
          })
          .firstPage((err, records) => {
            if (records) {
              setProductDetails(records[0].fields);
            }
          });
      });
    }
  }, [tagContent]);

  const onNfc = (e: PhoneGapNfc.TagEvent) => {
    const array: Array<number> = e.tag.id;
    const stringTag: string = array
      .toString()
      .split(',')
      .map((val) => {
        let temp = Math.abs(parseInt(val, 10)).toString(16);
        if (temp.length === 1) {
          return temp.padStart(2, '0');
        }
        return temp;
      })
      .join(':')
      .toString();

    setTagContent(stringTag);
  };

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
        <IonRow class="ion-align-items-center" style={{ height: '70%' }}>
          <IonCol class="ion-text-center">
            {tagContent ? (
              <>
                <IonIcon icon={informationCircle} class="info-icon ion-margin-vertical" color="primary"></IonIcon>
                <IonLabel class="info-row">Tag ID(TESTING): {tagContent}</IonLabel>
                {productDetails && (tagContent === 'test' || tagContent === testMac) && (
                  <>
                    <IonLabel class="info-row">Company: {productDetails.Company}</IonLabel>
                    <IonLabel class="info-row">Transfer ID: {productDetails['Transfer Id']}</IonLabel>
                    <IonLabel class="info-row">Created date: {productDetails.Created}</IonLabel>
                    <IonLabel class="info-row">Location: {productDetails.Location}</IonLabel>
                    <IonLabel class="info-row">Last interacted by: {productDetails.User}</IonLabel>
                  </>
                )}
              </>
            ) : (
              <>
                <IonIcon icon={search} class="info-icon ion-margin-vertical" color="primary"></IonIcon>
                <IonLabel style={{ display: 'block' }}>Scan a package to see its details!</IonLabel>
              </>
            )}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default MetaChecker;
