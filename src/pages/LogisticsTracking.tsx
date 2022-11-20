import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonRouterOutlet,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { business, storefront, cart } from 'ionicons/icons';
import axios from 'axios';
import { Route } from 'react-router';
import ProductList from '../components/ProductList';
import { useEffect } from 'react';

const LogisticsTracking: React.FC = () => {
  useEffect(() => {
    axios.get('/Products').then((res) => console.log(res.data.records));
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
        <IonTabs>
          <IonRouterOutlet id="tabs">
            <Route path="/:tab(warehouse)" render={() => <ProductList location="Warehouse" />} exact />
            <Route path="/:tab(inhouse)" render={() => <ProductList location="Inhouse" />} exact />
            <Route path="/:tab(stock)" render={() => <ProductList location="Stock" />} exact />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="warehouse">
              <IonIcon icon={business} />
              <IonLabel>Warehouse</IonLabel>
            </IonTabButton>

            <IonTabButton tab="inhouse">
              <IonIcon icon={storefront} />
              <IonLabel>Store</IonLabel>
            </IonTabButton>

            <IonTabButton tab="stock">
              <IonIcon icon={cart} />
              <IonLabel>Stock</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonPage>
  );
};

export default LogisticsTracking;
