import Head from 'next/head';
import dynamic from 'next/dynamic'
import { Layout, Breadcrumb } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer } = Layout;

export default function Home() {

  const [orderSelected, setOrderSelected] = useState(null);

  const DynamicComponent = dynamic(
    () => orderSelected
      ? import('../components/EditarOrden')
      : import('../components/ListaOrdenes')
  )

  return (
    <div>
      <Head>
        <title>Tendencys demo</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" crossOrigin="anonymous" />
      </Head>

      <Layout className="layout">
        <Header>
          <div className="logo" />
          <span className="header-text">Tendencys <small><small>demo</small></small></span>
        </Header>
        <Content className="main-content">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item
              onClick={() => setOrderSelected(null)}
              style={{
                cursor: orderSelected ? 'pointer' : undefined
              }}
            >{orderSelected?<><i className="fas fa-chevron-left"></i>&nbsp;</>:null}Órdenes</Breadcrumb.Item>
            {orderSelected
              ? <Breadcrumb.Item>Orden #{orderSelected.number}</Breadcrumb.Item>
              : null
            }
          </Breadcrumb>
          <div className="site-layout-content">
            <DynamicComponent setOrderSelected={setOrderSelected} orderSelected={orderSelected} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Creado con <i className="fas fa-heart"></i> por Ernesto Maldonado</Footer>
      </Layout>
    </div>
  )
}
