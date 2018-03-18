const Player  = require('./model/user');
const Goal    = require('./model/goal');
const Team    = require('./model/team');
const Party    = require('./model/party');
const RGProps    = require('./model/properties');



global.RGTemplates = 
{
    
    loadBlackShadow: _loadBlackShadow,
    loadJungle: _loadJungle,
    loadFire: _loadFire,
};

function _loadBlackShadow(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "War Town", started: true}, (err, party) => {
			    Player.create({name: 'Billy', role: 'Leader', password: 'leader'},
					  {name: 'John', role: 'Radio', password: 'radio'},
					  {name: 'Rachid', role: 'Hacker', password: 'hacker'},
					  {name: 'Rocco', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'Tresor', role: 'Leader', password: 'leader'},
					  {name: 'Sissoko', role: 'Radio', password: 'radio'},
					  {name: 'Dembele', role: 'Hacker', password: 'hacker'},
					  {name: 'Abdoulaye', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
					  (err, p1, p2, p3, p4, /*p5,*/ p6, p7, p8, p9/*, p10*/) => {
					      Team.create({name: "Sicario",
							   user_list: [p1._id, p2._id, p3._id, p4._id/*, p5._id*/], party_id: party._id}, 
							  {name: "Task Force",
							   user_list: [p6._id, p7._id, p8._id, p9._id/*, p10._id*/], party_id: party._id},
							  (err, t1, t2) => {
							      Player.addToTeam(p1._id, t1._id, ()=>{
								  Player.addToTeam(p2._id, t1._id, ()=>{
								      Player.addToTeam(p3._id, t1._id, ()=>{
									  Player.addToTeam(p4._id, t1._id, ()=>{
									      Player.addToTeam(p6._id, t2._id, ()=>{
										  Player.addToTeam(p7._id, t2._id, ()=>{
										      Player.addToTeam(p8._id, t2._id, ()=>{
											  Player.addToTeam(p9._id, t2._id, ()=>{
											      RGProps.set_active_template('black_shadow');
											      socket.emit('get_active_template', 'black_shadow');

											  });
										      });
										  });
									      })
									  })
								      })
								  })
							      })
							  });					      
					  })
			});
		    });
		});
	    });
	});
    })	    
}

function _loadJungle(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "Frontline", started: true}, (err, party) => {
			    Player.create({name: 'Billy', role: 'Leader', password: 'leader'},
					  {name: 'John', role: 'Radio', password: 'radio'},
					  {name: 'Rachid', role: 'Hacker', password: 'hacker'},
					  {name: 'Rocco', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'Tresor', role: 'Leader', password: 'leader'},
					  {name: 'Sissoko', role: 'Radio', password: 'radio'},
					  {name: 'Dembele', role: 'Hacker', password: 'hacker'},
					  {name: 'Abdoulaye', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
					  (err, p1, p2, p3, p4, /*p5,*/ p6, p7, p8, p9/*, p10*/) => {
					      Team.create({name: "RG Seals",
							   user_list: [p1._id, p2._id, p3._id, p4._id/*, p5._id*/], party_id: party._id}, 
							  {name: "RG Mercenaires",
							   user_list: [p6._id, p7._id, p8._id, p9._id/*, p10._id*/], party_id: party._id},
							  (err, t1, t2) => {
							      Player.addToTeam(p1._id, t1._id, ()=>{
								  Player.addToTeam(p2._id, t1._id, ()=>{
								      Player.addToTeam(p3._id, t1._id, ()=>{
									  Player.addToTeam(p4._id, t1._id, ()=>{
									      Player.addToTeam(p6._id, t2._id, ()=>{
										  Player.addToTeam(p7._id, t2._id, ()=>{
										      Player.addToTeam(p8._id, t2._id, ()=>{
											  Player.addToTeam(p9._id, t2._id, ()=>{
											      RGProps.set_active_template('jungle');
											      socket.emit('get_active_template', 'jungle');
											  });
										      });
										  });
									      })
									  })
								      })
								  })
							      })
							  });
					      
					  })
			});

		    });
		});
	    });
	});
    });

}

function _loadFire(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "TSS", started: true}, (err, party) => {
			    Player.create({name: 'Billy', role: 'Leader', password: 'leader'},
					  {name: 'John', role: 'Radio', password: 'radio'},
					  {name: 'Rachid', role: 'Hacker', password: 'hacker'},
					  {name: 'Rocco', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'Tresor', role: 'Leader', password: 'leader'},
					  {name: 'Sissoko', role: 'Radio', password: 'radio'},
					  {name: 'Dembele', role: 'Hacker', password: 'hacker'},
					  {name: 'Abdoulaye', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
					  (err, p1, p2, p3, p4, /*p5, */p6, p7, p8, p9/*, p10*/) => {
					      Team.create({name: "Task Force",
							   user_list: [p1._id, p2._id, p3._id, p4._id/*, p5._id*/], party_id: party._id}, 
							  {name: "MI6",
							   user_list: [p6._id, p7._id, p8._id, p9._id/*, p10._id*/], party_id: party._id},
							  (err, t1, t2) => {

							      Player.addToTeam(p1._id, t1._id, ()=>{
								  Player.addToTeam(p2._id, t1._id, ()=>{
								      Player.addToTeam(p3._id, t1._id, ()=>{
									  Player.addToTeam(p4._id, t1._id, ()=>{
									      Player.addToTeam(p6._id, t2._id, ()=>{
										  Player.addToTeam(p7._id, t2._id, ()=>{
										      Player.addToTeam(p8._id, t2._id, ()=>{
											  Player.addToTeam(p9._id, t2._id, ()=>{
											      
											      RGProps.set_active_template('fire');
											      socket.emit('get_active_template', 'fire');
											      

											  });
										      });
										  });
									      })
									  })
								      })
								  })
							      })
							  });
					      
					  })
			});

		    });
		});
	    });
	});
    });
    
}


module.exports = RGTemplates;
