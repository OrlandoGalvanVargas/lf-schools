const db = {
  collection: collectionName => {
    return {
      createOrUpdate: data => {
        const collection = JSON.parse(localStorage.getItem(collectionName)) || [];
        const item = collection.find(item => item.id === data.id);
        if (item) {
          collection.splice(collection.indexOf(item), 1);
        }
        collection.push(data);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event('storage'));
      },
      bulkCreateOrUpdate: data => {
        const collection = JSON.parse(localStorage.getItem(collectionName)) || [];
        data.forEach(item => {
          const _item = collection.find(i => i.id === item.id);
          if (_item) {
            collection.splice(collection.indexOf(_item), 1);
          }
          collection.push(item);
        });
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event('storage'));
      },
      bulkWrite: data => {
        localStorage.setItem(collectionName, JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
      },
      insertOne: data => {
        const collection = JSON.parse(localStorage.getItem(collectionName)) || [];
        collection.push(data);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        window.dispatchEvent(new Event('storage'));
      },
      updateOne: (id, data) => {
        const collection = JSON.parse(localStorage.getItem(collectionName)) || [];

        const updateTrip = collection.map(item => (item.id == id ? { ...item, ...data } : item));

        localStorage.setItem(collectionName, JSON.stringify(updateTrip));
        window.dispatchEvent(new Event('storage'));
      },
      deleteOne: id => {
        const collection = JSON.parse(localStorage.getItem(collectionName)) || [];
        const filtered = collection.filter(item => item.id !== Number(id));

        localStorage.setItem(collectionName, JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
      },
    };
  },
};

function CreateAction(client, action, reactor) {
  return (...params) => {
    window.dispatchEvent(new CustomEvent(`lf:${action}:start`, { detail: { action } }));

    return client[action](...params)
      .then(result => {
        reactor.onSuccess({ action, payload: result.data, params, db });
        window.dispatchEvent(new CustomEvent(`lf:${action}:success`, { detail: { action } }));
      })
      .catch(error => {
        reactor.onError({ action, error, params, db });
        window.dispatchEvent(new CustomEvent(`lf:${action}:error`, { detail: { action } }));
        throw error;
      });
  };
}

export function CreateService(client, reactor) {
  let result = {};
  Object.keys(client).forEach(key => {
    result[key] = CreateAction(client, key, reactor);
  });

  return result;
}
