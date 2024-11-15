# TP8 (Suite) : Navigation Avancée et État d'Authentification

## 4. Intégration du Progress Bar

### Création du Composant Progress (container/src/components/Progress.js)
```javascript
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// À vous d'implémenter :
// 1. Les styles avec makeStyles
// 2. Le composant avec la barre de progression
```

## 5. Configuration des URL Publiques

### Marketing (marketing/config/webpack.dev.js)
```javascript
const devConfig = {
  mode: 'development',
  output: {
    // À vous d'ajouter le publicPath
    publicPath: // URL complète avec port 8081
  },
  // Reste de la configuration...
};
```

### Container (container/config/webpack.dev.js)
```javascript
const devConfig = {
  mode: 'development',
  output: {
    // À vous d'ajouter le publicPath
    publicPath: // URL complète avec port 8080
  },
  // Reste de la configuration...
};
```

## 6. Synchronisation de l'État d'Authentification

### Container App (container/src/App.js)
```javascript
export default () => {
  // Gérez l'état d'authentification
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            // À vous d'implémenter :
            // 1. La propagation de l'état d'authentification
            // 2. La gestion de la déconnexion
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* Configurez les routes avec l'état d'authentification */}
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
```

## 7. Gestion des Histoires de Navigation

### Marketing Bootstrap (marketing/src/bootstrap.js)
```javascript
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // Créez l'historique avec le chemin initial
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });

  // À vous d'implémenter :
  // 1. L'écoute des changements de navigation
  // 2. La synchronisation avec le parent
};
```

### Auth Bootstrap (auth/src/bootstrap.js)
```javascript
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // Implémentez la même logique que marketing
  // mais avec la gestion de l'authentification en plus
};
```

## 8. Gestion des Routes Protégées

### App Container (container/src/App.js)
```javascript
<Switch>
  <Route path="/auth">
    <AuthLazy onSignIn={() => setIsSignedIn(true)} />
  </Route>
  <Route path="/" component={MarketingLazy} />
</Switch>
```

## Points d'Attention Supplémentaires

1. Préfixes des Classes CSS
- Container: 'co'
- Marketing: 'ma'
- Auth: 'au'

2. Public Path
- Chaque application doit avoir son publicPath unique
- Format dev: `http://localhost:PORT/`
- Format prod: `/app-name/latest/`

3. Historique de Navigation
- Container: Browser History
- Micro-frontends: Memory History
- Synchronisation bidirectionnelle

4. État d'Authentification
- Géré uniquement dans le container
- Propagé via props
- Affecte le header et les routes

## Vérification des Points Critiques

1. Navigation
```javascript
// Dans les composants mount
if (pathname !== nextPathname) {
  history.push(nextPathname);
}
```

2. État d'Authentification
```javascript
// Dans le container
<Header 
  onSignOut={() => setIsSignedIn(false)}
  isSignedIn={isSignedIn}
/>
```

3. Lazy Loading
```javascript
<Suspense fallback={<Progress />}>
  {/* Routes */}
</Suspense>
```

## Patterns Importants à Implémenter

1. Listener Pattern pour la Navigation
```javascript
// Dans les composants mount
history.listen(onNavigate);
```

2. Props Drilling pour l'Auth
```javascript
// Container → Header
isSignedIn={isSignedIn}
onSignOut={() => setIsSignedIn(false)}

// Container → AuthApp
onSignIn={() => setIsSignedIn(true)}
```

3. Memory History avec Chemin Initial
```javascript
createMemoryHistory({
  initialEntries: [initialPath],
})
```

