import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../theme'

export const Layout = ({
  children,
  uData,
  isAuth
}: {
  children?: any,
  uData?: any,
  isAuth?: any
}) => {
  return (
    <ThemeProvider theme={theme}>
      <section className={`hero`}>
        <Header uData={uData} isAuth={isAuth}/>
        {children}
        <Footer/>
      </section>
    </ThemeProvider>
  )
}