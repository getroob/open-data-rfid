import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface ProductListProps {
  products: Array<any>;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products &&
        products.map((product: any) => (
          <IonCard key={product['Transfer Id']}>
            <IonCardTitle>{product['Transfer Id']}</IonCardTitle>
            <IonCardSubtitle>{product['Location']}</IonCardSubtitle>
            <IonCardContent>{product['Company']}</IonCardContent>
          </IonCard>
        ))}
    </>
  );
};

export default ProductList;
