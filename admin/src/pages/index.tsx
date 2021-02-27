import React from 'react'
import { Layout } from '../components/Layout'
import { Content } from '../components/Content'

const Index = () => {
    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div>
                        <h1>Welcome to the Dot HQ Update Server!</h1>
                        <p>Please sign in to continue.</p>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Index;