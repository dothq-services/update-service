import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'

const Locales = () => {
    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Currently Available Locales</h1>
                        <Button type={'primary'} href={'/locales/add'}>
                            Add Locale
                        </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Locales;