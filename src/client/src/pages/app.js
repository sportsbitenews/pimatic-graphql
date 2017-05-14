import React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { Link, Route, Redirect } from "react-router-dom";

import Split from "grommet/components/Split";
import App from "grommet/components/App";
import Sidebar from "grommet/components/Sidebar";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Spinning from "grommet/components/icons/Spinning";

import environment from "../environment";

import PagePage from "./page";

function RouterAnchor({ children, ...rest }) {
  return <Link {...rest}><Anchor tag="span">{children}</Anchor></Link>;
}

function SidebarMenu({ title, children }) {
  return (
    <Menu primary size="small">
      <Header align="end" pad={{ horizontal: "medium" }}>
        <Heading tag="h4" strong>{title}</Heading>
      </Header>
      {children}
    </Menu>
  );
}

function AppContent({ initialPageId, match }) {
  return (
    <div>
      <Route path={`${match.url}/pages/:pageId`} component={PagePage} />
      <Redirect to={`${match.url}/pages/${initialPageId}`} />
    </div>
  );
}

function AppPage({ pages, loading, match }) {
  let firstPageId = undefined;

  if (!loading && pages.edges.length > 0) {
    firstPageId = pages.edges[0].node.pageId;
  } else {
    loading = true;
  }

  return (
    <Split flex="right">
      <Sidebar size="small" colorIndex="neutral-1">
        <Header pad="medium">
          <Title>pimatic</Title>
        </Header>
        <SidebarMenu title="Pages">
          {pages.edges.map(({ node: { pageId, name } }) => (
            <Anchor key={pageId} path={`${match.url}/pages/${pageId}`}>
              {name}
            </Anchor>
          ))}
        </SidebarMenu>
        {/*<SidebarMenu title="Settings">
          <RouterAnchor to="/app/devices">Devices</RouterAnchor>
          <RouterAnchor to="/app/groups">Groups</RouterAnchor>
        </SidebarMenu>*/}
      </Sidebar>
      <App>
        <Box full colorIndex="light-2" primary>
          {loading
            ? <Box full align="center" justify="center">
                <Spinning size="xlarge" />
              </Box>
            : <AppContent match={match} initialPageId={firstPageId} />}
        </Box>
      </App>
    </Split>
  );
}

const appQuery = graphql`
    query appQuery {
      pages {
        edges {
          node {
            name
            pageId
          }
        }
      }
    }
  `;

export default ({ match }) => (
  <QueryRenderer
    environment={environment}
    query={appQuery}
    render={({ error, props }) => {
      if (props) {
        return <AppPage pages={props.pages} match={match} />;
      } else if (error) {
        return <div>{error.message}</div>;
      }

      return <AppPage pages={{ edges: [], loading: true }} />;
    }}
  />
);
