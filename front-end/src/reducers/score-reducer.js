export default (state = [], {type, payload}) => {
    switch(type){
      case 'SCORE_LOAD':
        payload = payload.sort((a,b) => {
          let score1 = a.score;
          let score2 = b.score;
          if(score1 > score2) {
              return -1;
          }
          if(score2 > score1){
              return 1;
          }
          return 0;
          });
          payload[0].name = `(TOP SCORE!) ${payload[0].name}`;
        return payload;
      case 'SCORE_ADD':
        return [...state, payload];
      case 'SCORE_UPDATE':
        state = state.map(food=>{
          if( food.id === payload.id ){
            return payload;  
          }
          return food;
        });
        return state;
      case 'SCORE_DELETE':
        state = state.filter(food => food.id !== payload);
        return state;
      default:
        return state;
    }
  };