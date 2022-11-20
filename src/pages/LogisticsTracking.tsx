import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonRow,
  IonCol,
} from '@ionic/react';
import { business, storefront, cart } from 'ionicons/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

const LogisticsTracking: React.FC = () => {
  const [products, setProducts] = useState<any>(null);
  const [activeList, setActiveList] = useState('warehouse');
  useEffect(() => {
    axios.get('/Transfers').then((res) => {
      let temp: any = {};
      res.data.records.forEach((rec: any) => {
        const header = rec.fields.Location.toLowerCase();
        if (temp[header]) {
          let t = temp[header];
          t.push({ ...rec.fields });
          temp[header] = t;
        } else {
          temp[header] = [{ ...rec.fields }];
        }
      });
      setProducts(temp);
    });
  }, []);
  return (
    <IonPage id="logistics">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Logistics Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol>
            <IonButton
              fill={activeList === 'warehouse' ? 'solid' : 'outline'}
              expand="block"
              class="ion-text-wrap location-btn"
              onClick={() => setActiveList('warehouse')}
            >
              <div>
                <IonIcon icon={business} />
                <IonLabel style={{ display: 'block' }}>Warehouse</IonLabel>
              </div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              fill={activeList === 'store' ? 'solid' : 'outline'}
              expand="block"
              class="ion-text-wrap location-btn"
              onClick={() => setActiveList('store')}
            >
              <div>
                <IonIcon icon={storefront} />
                <IonLabel style={{ display: 'block' }}>Store</IonLabel>
              </div>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              fill={activeList === 'stock' ? 'solid' : 'outline'}
              expand="block"
              class="ion-text-wrap location-btn"
              onClick={() => setActiveList('stock')}
            >
              <div>
                <IonIcon icon={cart} />
                <IonLabel style={{ display: 'block' }}>Stock</IonLabel>
              </div>
            </IonButton>
          </IonCol>
        </IonRow>
        {products && <ProductList products={products[activeList]} />}
      </IonContent>
    </IonPage>
  );
};

export default LogisticsTracking;
