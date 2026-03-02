<!-- Start of team lead instructions  -->

## Data layer

Our application is built on react-router. The application is fully client side rendered. For state, we will use [zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction) to store data. When it comes to store design, it is important to split stores to specific domains using slices, but we will have a single unified store.

We have an API in `src/data/index.ts` that provides a clean interface for accessing data within stores to components.

We're using mocked data for now, so we don't have remote calls. When the application boots, we load the mocked data into the store and update the UI. For now, the mock data is in `src/service/mocks.ts`.

<!--- End of team lead instructions -->

<!--- Start of Claude and agents instructions -->
<!--- End of Claude and agents instructions -->
