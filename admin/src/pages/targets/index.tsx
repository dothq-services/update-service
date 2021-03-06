import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import * as cookie from 'cookie'
import { GetServerSideProps } from 'next'

const Targets = (props) => {
    const [targets, setTargets] = React.useState({})
    const router  = useRouter();

    if (props.noAuth) {
        router.push('/noauth')
    }

    return (
        <Layout uData={props.userData} isAuth={props.isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Currently Available Targets</h1>
                        <Button color="primary" variant="contained" disableElevation href={'/targets/add'}>
                            Add Target
                        </Button>
                    </div>
                </div>
            </Content>
            <Content>
                {(targets as any)[0] && (
                    <>
                        {(targets as any).map((t) => (<p>{t.displayname}</p>))}
                    </>
                )}
            </Content>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie)
    let userData = {};
    let isAuth: boolean = false;
    let noAuth: boolean = false;


    if (cookies.token !== undefined ) {
        await axios.post(`http://${context.req.headers.host}/api/id/getOrganizations`, {
            token: cookies.token
        }).then((res) => { 
            if (res.data.success === 'dothq') {
                isAuth = true
            }
        })
    }

    if (isAuth) {
        await axios.post(`http://${context.req.headers.host}/api/id/getProfile`, {
            token: cookies.token
        }).then((res) => {
            userData = res.data;
        })
    }

    if (cookies.token === undefined) {
        noAuth = true;
    }

    return {
        props: {
            cookies,
            isAuth,
            userData,
            noAuth
        }
    }
}

export default Targets;