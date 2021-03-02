import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Callback = () => {
    const { query } = useRouter();
    const router  = useRouter();
    const [cookie, setCookie] = useCookies(["token"])

    React.useEffect(() => {
        if (query.token) {
            setCookie('token', query.token)
            router.push('/')
        } else {
            // do something to let user know something went wrong
        }
    }, [query.token])

    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div>
                        <h1>Please Wait...</h1>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Callback;