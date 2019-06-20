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
    loadManche4: _loadAirsoftLeague_manche4
};

function _loadBlackShadow(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "War Town", started: true}, (err, party) => {
			    Player.create({name: 'cleader', role: 'Leader', password: 'leader'},
					  {name: 'cradio', role: 'Radio', password: 'radio'},
					  {name: 'chacker', role: 'Hacker', password: 'hacker'},
					  {name: 'ccharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'tsleader', role: 'Leader', password: 'leader'},
					  {name: 'tsradio', role: 'Radio', password: 'radio'},
					  {name: 'tshacker', role: 'Hacker', password: 'hacker'},
					  {name: 'tscharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
					  (err, p1, p2, p3, p4, /*p5,*/ p6, p7, p8, p9/*, p10*/) => {
					      Team.create({name: "Contractor",
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

											      Goal.create(
												  //secteur V
												  {name: '1.1', code: '1.1', label: "1 - Secteur V",  number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: '1.2', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: '1.3', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: '1.4', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: '1.5', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: '1.6', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: '2.1', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: '2.2', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: '2.3', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: '2.4', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: '2.5', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: '2.6', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: '3.1', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: '3.2', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: '3.3', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: '3.4', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: '3.5', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: '3.6', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},

												  //lost
												  {name: '4.1', code: '4.1', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: '4.2', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.4', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.5', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.6', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: '5.1', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: '5.2', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '5.3', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: '5.4', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: '5.5', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: '5.6', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  

												  //black
												  {name: 'Black leader', code: 'bleader', number_of_points: 500, compteur: 1},
												  {name: 'Black operateur', code: 'boperator', number_of_points: 500, compteur: 1},
												  {name: 'Black hacker', code: 'bhacker', number_of_points: 500, compteur: 1},
												  {name: 'Black medecin', code: 'bmedic', number_of_points: 500, compteur: 1},
												  {name: 'Black mitrailleur', code: 'bmitrailleur', number_of_points: 500, compteur: 1},
												  {name: 'Black demineur', code: 'bdemineur', number_of_points: 500, compteur: 1},
												  {name: 'Black radio', code: 'bradio', number_of_points: 500, compteur: 1},
												  {name: 'Black sapeur', code: 'bsapeur', number_of_points: 500, compteur: 1},

												  //red
												  {name: 'Red leader', code: 'rleader', number_of_points: 500, compteur: 1},
												  {name: 'Red operateur', code: 'roperator', number_of_points: 500, compteur: 1},
												  {name: 'Red hacker', code: 'rhacker', number_of_points: 500, compteur: 1},
												  {name: 'Red medecin', code: 'rmedic', number_of_points: 500, compteur: 1},
												  {name: 'Red mitrailleur', code: 'rmitrailleur', number_of_points: 500, compteur: 1},
												  {name: 'Red demineur', code: 'rdemineur', number_of_points: 500, compteur: 1},
												  {name: 'Red radio', code: 'rradio', number_of_points: 500, compteur: 1},
												  {name: 'Red sapeur', code: 'rsapeur', number_of_points: 500, compteur: 1},

												  //bonus
												  {name: 'Bonus 1 Red', code: 'rbonus_1', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 2 Red', code: 'rbonus_2', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 3 Red', code: 'rbonus_3', number_of_points: 500, compteur: 1},

												  {name: 'Bonus 1 Black', code: 'bbonus_1', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 2 Black', code: 'bbonus_2', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 3 Black', code: 'bbonus_3', number_of_points: 500, compteur: 1},

												  {name: 'Penalite', code: 'penality', number_of_points: -3000, compteur: 1}

												  

												  ,(err) => {
												      RGProps.set_active_template('black_shadow');
												      socket.emit('get_active_template', 'black_shadow');
												  }
											      );
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
			    Player.create({name: 'cleader', role: 'Leader', password: 'leader'},
					  {name: 'cradio', role: 'Radio', password: 'radio'},
					  {name: 'chacker', role: 'Hacker', password: 'hacker'},
					  {name: 'ccharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'tsleader', role: 'Leader', password: 'leader'},
					  {name: 'tsradio', role: 'Radio', password: 'radio'},
					  {name: 'tshacker', role: 'Hacker', password: 'hacker'},
					  {name: 'tscharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
					  (err, p1, p2, p3, p4, /*p5,*/ p6, p7, p8, p9/*, p10*/) => {
					      Team.create({name: "Contractor",
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
											      Goal.create(
												  //secteur V
												  {name: '1.1', code: '1.1', label: "1 - Secteur V",  number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: '1.2', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: '1.3', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: '1.4', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: '1.5', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: '1.6', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: '2.1', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: '2.2', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: '2.3', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: '2.4', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: '2.5', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: '2.6', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: '3.1', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: '3.2', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: '3.3', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: '3.4', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: '3.5', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: '3.6', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},

												  //lost
												  {name: '4.1', code: '4.1', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: '4.2', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.4', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.5', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.6', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: '5.1', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: '5.2', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '5.3', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: '5.4', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: '5.5', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: '5.6', label: "5 - Fort", number_of_points: 1000, compteur: 1},

												  //black
												  {name: 'Black leader', code: 'bleader', number_of_points: 500, compteur: 1},
												  {name: 'Black operateur', code: 'boperator', number_of_points: 500, compteur: 1},
												  {name: 'Black hacker', code: 'bhacker', number_of_points: 500, compteur: 1},
												  {name: 'Black medecin', code: 'bmedic', number_of_points: 500, compteur: 1},
												  {name: 'Black mitrailleur', code: 'bmitrailleur', number_of_points: 500, compteur: 1},
												  {name: 'Black demineur', code: 'bdemineur', number_of_points: 500, compteur: 1},
												  {name: 'Black radio', code: 'bradio', number_of_points: 500, compteur: 1},
												  {name: 'Black sapeur', code: 'bsapeur', number_of_points: 500, compteur: 1},

												  //red
												  {name: 'Red leader', code: 'rleader', number_of_points: 500, compteur: 1},
												  {name: 'Red operateur', code: 'roperator', number_of_points: 500, compteur: 1},
												  {name: 'Red hacker', code: 'rhacker', number_of_points: 500, compteur: 1},
												  {name: 'Red medecin', code: 'rmedic', number_of_points: 500, compteur: 1},
												  {name: 'Red mitrailleur', code: 'rmitrailleur', number_of_points: 500, compteur: 1},
												  {name: 'Red demineur', code: 'rdemineur', number_of_points: 500, compteur: 1},
												  {name: 'Red radio', code: 'rradio', number_of_points: 500, compteur: 1},
												  {name: 'Red sapeur', code: 'rsapeur', number_of_points: 500, compteur: 1},

												  //bonus
												  {name: 'Bonus 1 Red', code: 'rbonus_1', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 2 Red', code: 'rbonus_2', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 3 Red', code: 'rbonus_3', number_of_points: 500, compteur: 1},

												  {name: 'Bonus 1 Black', code: 'bbonus_1', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 2 Black', code: 'bbonus_2', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 3 Black', code: 'bbonus_3', number_of_points: 500, compteur: 1}

												  , (err) => {
												      RGProps.set_active_template('jungle');
												      socket.emit('get_active_template', 'jungle');
												  }
											      );

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
			    Player.create({name: 'cleader', role: 'Leader', password: 'leader'},
					  {name: 'cradio', role: 'Radio', password: 'radio'},
					  {name: 'chacker', role: 'Hacker', password: 'hacker'},
					  {name: 'ccharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'tsleader', role: 'Leader', password: 'leader'},
					  {name: 'tsradio', role: 'Radio', password: 'radio'},
					  {name: 'tshacker', role: 'Hacker', password: 'hacker'},
					  {name: 'tscharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
					  (err, p1, p2, p3, p4, /*p5, */p6, p7, p8, p9/*, p10*/) => {
					      Team.create({name: "Contractor",
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
											      Goal.create(
												  //secteur V
												  {name: '1.1', code: '1.1', label: "1 - Secteur V",  number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: '1.2', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: '1.3', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: '1.4', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: '1.5', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: '1.6', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: '2.1', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: '2.2', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: '2.3', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: '2.4', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: '2.5', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: '2.6', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: '3.1', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: '3.2', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: '3.3', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: '3.4', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: '3.5', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: '3.6', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},

												  //lost
												  {name: '4.1', code: '4.1', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: '4.2', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.4', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.5', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.6', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: '5.1', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: '5.2', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '5.3', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: '5.4', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: '5.5', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: '5.6', label: "5 - Fort", number_of_points: 1000, compteur: 1},

												  //black
												  {name: 'Black leader', code: 'bleader', number_of_points: 500, compteur: 1},
												  {name: 'Black operateur', code: 'boperator', number_of_points: 500, compteur: 1},
												  {name: 'Black hacker', code: 'bhacker', number_of_points: 500, compteur: 1},
												  {name: 'Black medecin', code: 'bmedic', number_of_points: 500, compteur: 1},
												  {name: 'Black mitrailleur', code: 'bmitrailleur', number_of_points: 500, compteur: 1},
												  {name: 'Black demineur', code: 'bdemineur', number_of_points: 500, compteur: 1},
												  {name: 'Black radio', code: 'bradio', number_of_points: 500, compteur: 1},
												  {name: 'Black sapeur', code: 'bsapeur', number_of_points: 500, compteur: 1},

												  //red
												  {name: 'Red leader', code: 'rleader', number_of_points: 500, compteur: 1},
												  {name: 'Red operateur', code: 'roperator', number_of_points: 500, compteur: 1},
												  {name: 'Red hacker', code: 'rhacker', number_of_points: 500, compteur: 1},
												  {name: 'Red medecin', code: 'rmedic', number_of_points: 500, compteur: 1},
												  {name: 'Red mitrailleur', code: 'rmitrailleur', number_of_points: 500, compteur: 1},
												  {name: 'Red demineur', code: 'rdemineur', number_of_points: 500, compteur: 1},
												  {name: 'Red radio', code: 'rradio', number_of_points: 500, compteur: 1},
												  {name: 'Red sapeur', code: 'rsapeur', number_of_points: 500, compteur: 1},

												  //bonus
												  {name: 'Bonus 1 Red', code: 'rbonus_1', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 2 Red', code: 'rbonus_2', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 3 Red', code: 'rbonus_3', number_of_points: 500, compteur: 1},

												  {name: 'Bonus 1 Black', code: 'bbonus_1', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 2 Black', code: 'bbonus_2', number_of_points: 500, compteur: 1},
												  {name: 'Bonus 3 Black', code: 'bbonus_3', number_of_points: 500, compteur: 1}
											      
												  , (err) => {
												      RGProps.set_active_template('fire');
												      socket.emit('get_active_template', 'fire');
												  }
											      );
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

function _loadAirsoftLeague_manche4(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "Airsoft League Manche 4", started: true}, (err, party) => {
			    Player.create({name: 'uleader', role: 'Leader', password: 'leader'},
					  {name: 'uhacker', role: 'Hacker', password: 'hacker'},

					  {name: 'fleader', role: 'Leader', password: 'leader'},
					  {name: 'fhacker', role: 'Hacker', password: 'hacker'},

					  {name: 'eleader', role: 'Leader', password: 'leader'},
					  {name: 'ehacker', role: 'Hacker', password: 'hacker'},

					  {name: 'gleader', role: 'Leader', password: 'leader'},
					  {name: 'ghacker', role: 'Hacker', password: 'hacker'},

					  (err, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16) => {
					      Team.create({name: "USJTF",
							   user_list: [p1._id, p2._id], party_id: party._id}, 
							  {name: "FAST27",
							   user_list: [p3._id, p4._id], party_id: party._id},
							  {name: "EIA",
							   user_list: [p5._id, p6._id], party_id: party._id},
							  {name: "GHOST SHELL",
							   user_list: [p7._id, p8._id], party_id: party._id},
							  (err, t1, t2, t3, t4) => {
							      
							      Player.addToTeam(p1._id, t1._id, ()=>{
								  Player.addToTeam(p2._id, t1._id, ()=>{
								      
								      Player.addToTeam(p3._id, t2._id, ()=>{
									  Player.addToTeam(p4._id, t2._id, ()=>{
									      
									      Player.addToTeam(p5._id, t3._id, ()=>{
										  Player.addToTeam(p6._id, t3._id, ()=>{
										      
										      Player.addToTeam(p7._id, t4._id, ()=>{
											  Player.addToTeam(p8._id, t4._id, ()=>{
											      
											      Goal.create(
												  //secteur V
												  {name: '1.1', code: '1.1', label: "1 - Secteur V",  number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: '1.2', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: '1.3', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: '1.4', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: '1.5', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: '1.6', label: "1 - Secteur V", number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: '2.1', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: '2.2', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: '2.3', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: '2.4', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: '2.5', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: '2.6', label: "2 - Zero", number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: '3.1', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: '3.2', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: '3.3', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: '3.4', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: '3.5', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: '3.6', label: "3 - Camps mili", number_of_points: 1000, compteur: 1},
												  
												  //lost
												  {name: '4.1', code: '4.1', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: '4.2', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.4', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.5', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},
												  {name: '4.6', code: '4.3', label: "4 - Lost", number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: '5.1', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: '5.2', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '5.3', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: '5.4', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: '5.5', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: '5.6', label: "5 - Fort", number_of_points: 1000, compteur: 1},
												  
												  //black
												  {name: 'Black leader', code: 'bleader', number_of_points: 200, compteur: 1},
												  {name: 'Black operateur', code: 'boperator', number_of_points: 50, compteur: 1},
												  {name: 'Black hacker', code: 'bhacker', number_of_points: 150, compteur: 1},
												  {name: 'Black medic', code: 'bmedic', number_of_points: 110, compteur: 1},
												  {name: 'Black radio', code: 'bradio', number_of_points: 90, compteur: 1},
												  {name: 'Black sapeur', code: 'bsapeur', number_of_points: 80, compteur: 1},

												  {name: 'Tan leader', code: 'tleader', number_of_points: 200, compteur: 1},
												  {name: 'Tan operateur', code: 'toperator', number_of_points: 50, compteur: 1},
												  {name: 'Tan hacker', code: 'thacker', number_of_points: 150, compteur: 1},
												  {name: 'Tan medic', code: 'tmedic', number_of_points: 110, compteur: 1},
												  {name: 'Tan radio', code: 'tradio', number_of_points: 90, compteur: 1},
												  {name: 'Tan sapeur', code: 'tsapeur', number_of_points: 80, compteur: 1},

												  {name: 'MultiCam leader', code: 'mleader', number_of_points: 200, compteur: 1},
												  {name: 'MultiCam operateur', code: 'moperator', number_of_points: 50, compteur: 1},
												  {name: 'MultiCam hacker', code: 'mhacker', number_of_points: 150, compteur: 1},
												  {name: 'MultiCam medic', code: 'mmedic', number_of_points: 110, compteur: 1},
												  {name: 'MultiCam radio', code: 'mradio', number_of_points: 90, compteur: 1},
												  {name: 'MultiCam sapeur', code: 'msapeur', number_of_points: 80, compteur: 1},

												  {name: 'Kaki leader', code: 'kleader', number_of_points: 200, compteur: 1},
												  {name: 'Kaki operateur', code: 'koperator', number_of_points: 50, compteur: 1},
												  {name: 'Kaki hacker', code: 'khacker', number_of_points: 150, compteur: 1},
												  {name: 'Kaki medic', code: 'kmedic', number_of_points: 110, compteur: 1},
												  {name: 'Kaki radio', code: 'kradio', number_of_points: 90, compteur: 1},
												  {name: 'Kaki sapeur', code: 'ksapeur', number_of_points: 80, compteur: 1},
												  
												  //bonus
												  {name: 'Penalité team', code: 'rgp', number_of_points: -3000, compteur: 1},
												  {name: 'Transport de marchandise', code: 'tdm', number_of_points: 700, compteur: 1}
												  
												  
												  , (err) => {
												      RGProps.set_active_template('Airsoft League Manche 4');
												      socket.emit('get_active_template', 'Airsoft League Manche 4');
												  }																  
											      );
											  });
										      });
										  });
									      });
									  });
								      });
								  });
							      });
							      
							  })
					  });
			    
			});
		    });
		});
	    });
	});
    });


}

module.exports = RGTemplates;
