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
    load4x4: _load4x4
};

function _loadBlackShadow(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "War Town", started: true}, (err, party) => {
			    Player.create({name: 'rleader', role: 'Leader', password: 'leader'},
					  {name: 'rradio', role: 'Radio', password: 'radio'},
					  {name: 'rhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'rcharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'bleader', role: 'Leader', password: 'leader'},
					  {name: 'bradio', role: 'Radio', password: 'radio'},
					  {name: 'bhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'bcharoniard', role: 'Charoniard', password: 'charoniard'},
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

											      Goal.create(
												  //secteur V
												  {name: '1.1', code: 'http://opn.to/a/YCRyZ', number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: 'http://opn.to/a/qJ2F7', number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: 'http://opn.to/a/3gUoR', number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: 'http://opn.to/a/qkcfN', number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: 'http://opn.to/a/MZzMy', number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: 'http://opn.to/a/sVqEd', number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: 'http://opn.to/a/K5azV', number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: 'http://opn.to/a/6kodj', number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: 'http://opn.to/a/gB20h', number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: 'http://opn.to/a/99tV3', number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: 'http://opn.to/a/NVEZr', number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: 'http://opn.to/a/54B8q', number_of_points: 1000, compteur: 1},
												  {name: '2.7', code: 'http://opn.to/a/ROM0k', number_of_points: 1000, compteur: 1},
												  {name: '2.8', code: 'http://www.qrstuff.com/', number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: 'http://zh.wikipedia.org/', number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: 'It\'s great! Your app works!', number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: 'http://virginieberger.com', number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: 'Bienvenue sur Unitag.fr !', number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: 'http://www.qrstuff.com', number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: 'http://bit.ly/GiraDischi', number_of_points: 1000, compteur: 1},

												  //lost
												  {name: '4.1', code: 'http://opn.to/a/k9o7h', number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: 'https://goo.gl/HzULC2', number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: 'Scanner', number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: 'La réduction 15% sur n’importe quel pack premium ! Utilisez le code de réduction : QRCODE', number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: 'http://mathematica.stackexchange.com/', number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '"There is never a good enough reason to justify a QR Code." - Scott Hanselman', number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: 'a', number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: 'http://adafru.it/qr', number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: 'https://www.quora.com/What-is-my-QR-code/answer/Joel-Postman', number_of_points: 1000, compteur: 1},
												  {name: '5.7', code: 'no fee ATM', number_of_points: 1000, compteur: 1},
												  {name: '5.8', code: 'http://fr.wikipedia.org/', number_of_points: 1000, compteur: 1},
												  {name: '5.9', code: 'YKART', number_of_points: 1000, compteur: 1},

												  //black
												  {name: 'Black leader', code: 'operateur bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black operateur', code: 'leader bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black hacker', code: 'hacker bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black medecin', code: 'MEDECIN', number_of_points: 500, compteur: 1},
												  {name: 'Black mitraiileur', code: 'MITRAILLEUR', number_of_points: 500, compteur: 1},
												  {name: 'Black demineur', code: 'DEMINEUR', number_of_points: 500, compteur: 1},
												  {name: 'Black radio', code: 'RADIO', number_of_points: 500, compteur: 1},
												  {name: 'Black sapeur', code: 'SAPEUR', number_of_points: 500, compteur: 1},

												  //red
												  {name: 'Red leader', code: 'leader rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red operateur', code: 'operateur rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red hacker', code: 'hacker rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red medecin', code: 'MEDECIN ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red mitrailleur', code: 'MITRAILLEUR ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red demineur', code: 'DEMINEUR ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red radio', code: 'RADIO ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red sapeur', code: 'SAPEUR ROUGE', number_of_points: 500, compteur: 1}
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
			    Player.create({name: 'rleader', role: 'Leader', password: 'leader'},
					  {name: 'rradio', role: 'Radio', password: 'radio'},
					  {name: 'rhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'rcharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'bleader', role: 'Leader', password: 'leader'},
					  {name: 'bradio', role: 'Radio', password: 'radio'},
					  {name: 'bhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'bcharoniard', role: 'Charoniard', password: 'charoniard'},
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
											      Goal.create(
												  //secteur V
												  {name: '1.1', code: 'http://opn.to/a/YCRyZ', number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: 'http://opn.to/a/qJ2F7', number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: 'http://opn.to/a/3gUoR', number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: 'http://opn.to/a/qkcfN', number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: 'http://opn.to/a/MZzMy', number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: 'http://opn.to/a/sVqEd', number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: 'http://opn.to/a/K5azV', number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: 'http://opn.to/a/6kodj', number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: 'http://opn.to/a/gB20h', number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: 'http://opn.to/a/99tV3', number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: 'http://opn.to/a/NVEZr', number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: 'http://opn.to/a/54B8q', number_of_points: 1000, compteur: 1},
												  {name: '2.7', code: 'http://opn.to/a/ROM0k', number_of_points: 1000, compteur: 1},
												  {name: '2.8', code: 'http://www.qrstuff.com/', number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: 'http://zh.wikipedia.org/', number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: 'It\'s great! Your app works!', number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: 'http://virginieberger.com', number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: 'Bienvenue sur Unitag.fr !', number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: 'http://www.qrstuff.com', number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: 'http://bit.ly/GiraDischi', number_of_points: 1000, compteur: 1},

												  //lost
												  {name: '4.1', code: 'http://opn.to/a/k9o7h', number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: 'https://goo.gl/HzULC2', number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: 'Scanner', number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: 'La réduction 15% sur n’importe quel pack premium ! Utilisez le code de réduction : QRCODE', number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: 'http://mathematica.stackexchange.com/', number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '"There is never a good enough reason to justify a QR Code." - Scott Hanselman', number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: 'a', number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: 'http://adafru.it/qr', number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: 'https://www.quora.com/What-is-my-QR-code/answer/Joel-Postman', number_of_points: 1000, compteur: 1},
												  {name: '5.7', code: 'no fee ATM', number_of_points: 1000, compteur: 1},
												  {name: '5.8', code: 'http://fr.wikipedia.org/', number_of_points: 1000, compteur: 1},
												  {name: '5.9', code: 'YKART', number_of_points: 1000, compteur: 1},

												  //black
												  {name: 'Black leader', code: 'operateur bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black operateur', code: 'leader bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black hacker', code: 'hacker bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black medecin', code: 'MEDECIN', number_of_points: 500, compteur: 1},
												  {name: 'Black mitraiileur', code: 'MITRAILLEUR', number_of_points: 500, compteur: 1},
												  {name: 'Black demineur', code: 'DEMINEUR', number_of_points: 500, compteur: 1},
												  {name: 'Black radio', code: 'RADIO', number_of_points: 500, compteur: 1},
												  {name: 'Black sapeur', code: 'SAPEUR', number_of_points: 500, compteur: 1},

												  //red
												  {name: 'Red leader', code: 'leader rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red operateur', code: 'operateur rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red hacker', code: 'hacker rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red medecin', code: 'MEDECIN ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red mitrailleur', code: 'MITRAILLEUR ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red demineur', code: 'DEMINEUR ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red radio', code: 'RADIO ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red sapeur', code: 'SAPEUR ROUGE', number_of_points: 500, compteur: 1}
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
			    Player.create({name: 'rleader', role: 'Leader', password: 'leader'},
					  {name: 'rradio', role: 'Radio', password: 'radio'},
					  {name: 'rhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'rcharoniard', role: 'Charoniard', password: 'charoniard'},
					  //{name: 'Sean', role: 'Medic', password: 'charoniard'},
					  {name: 'bleader', role: 'Leader', password: 'leader'},
					  {name: 'bradio', role: 'Radio', password: 'radio'},
					  {name: 'bhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'bcharoniard', role: 'Charoniard', password: 'charoniard'},
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
											      Goal.create(
												  //secteur V
												  {name: '1.1', code: 'http://opn.to/a/YCRyZ', number_of_points: 1000, compteur: 1},
												  {name: '1.2', code: 'http://opn.to/a/qJ2F7', number_of_points: 1000, compteur: 1},
												  {name: '1.3', code: 'http://opn.to/a/3gUoR', number_of_points: 1000, compteur: 1},
												  {name: '1.4', code: 'http://opn.to/a/qkcfN', number_of_points: 1000, compteur: 1},
												  {name: '1.5', code: 'http://opn.to/a/MZzMy', number_of_points: 1000, compteur: 1},
												  {name: '1.6', code: 'http://opn.to/a/sVqEd', number_of_points: 1000, compteur: 1},

												  //zero
												  {name: '2.1', code: 'http://opn.to/a/K5azV', number_of_points: 1000, compteur: 1},
												  {name: '2.2', code: 'http://opn.to/a/6kodj', number_of_points: 1000, compteur: 1},
												  {name: '2.3', code: 'http://opn.to/a/gB20h', number_of_points: 1000, compteur: 1},
												  {name: '2.4', code: 'http://opn.to/a/99tV3', number_of_points: 1000, compteur: 1},
												  {name: '2.5', code: 'http://opn.to/a/NVEZr', number_of_points: 1000, compteur: 1},
												  {name: '2.6', code: 'http://opn.to/a/54B8q', number_of_points: 1000, compteur: 1},
												  {name: '2.7', code: 'http://opn.to/a/ROM0k', number_of_points: 1000, compteur: 1},
												  {name: '2.8', code: 'http://www.qrstuff.com/', number_of_points: 1000, compteur: 1},
												  
												  //camps mili
												  {name: '3.1', code: 'http://zh.wikipedia.org/', number_of_points: 1000, compteur: 1},
												  {name: '3.2', code: 'It\'s great! Your app works!', number_of_points: 1000, compteur: 1},
												  {name: '3.3', code: 'http://virginieberger.com', number_of_points: 1000, compteur: 1},
												  {name: '3.4', code: 'Bienvenue sur Unitag.fr !', number_of_points: 1000, compteur: 1},
												  {name: '3.5', code: 'http://www.qrstuff.com', number_of_points: 1000, compteur: 1},
												  {name: '3.6', code: 'http://bit.ly/GiraDischi', number_of_points: 1000, compteur: 1},

												  //lost
												  {name: '4.1', code: 'http://opn.to/a/k9o7h', number_of_points: 1000, compteur: 1},
												  {name: '4.2', code: 'https://goo.gl/HzULC2', number_of_points: 1000, compteur: 1},
												  {name: '4.3', code: 'Scanner', number_of_points: 1000, compteur: 1},

												  //fort
												  {name: '5.1', code: 'La réduction 15% sur n’importe quel pack premium ! Utilisez le code de réduction : QRCODE', number_of_points: 1000, compteur: 1},
												  {name: '5.2', code: 'http://mathematica.stackexchange.com/', number_of_points: 1000, compteur: 1},
												  {name: '5.3', code: '"There is never a good enough reason to justify a QR Code." - Scott Hanselman', number_of_points: 1000, compteur: 1},
												  {name: '5.4', code: 'a', number_of_points: 1000, compteur: 1},
												  {name: '5.5', code: 'http://adafru.it/qr', number_of_points: 1000, compteur: 1},
												  {name: '5.6', code: 'https://www.quora.com/What-is-my-QR-code/answer/Joel-Postman', number_of_points: 1000, compteur: 1},
												  {name: '5.7', code: 'no fee ATM', number_of_points: 1000, compteur: 1},
												  {name: '5.8', code: 'http://fr.wikipedia.org/', number_of_points: 1000, compteur: 1},
												  {name: '5.9', code: 'YKART', number_of_points: 1000, compteur: 1},

												  //black
												  {name: 'Black leader', code: 'operateur bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black operateur', code: 'leader bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black hacker', code: 'hacker bleu', number_of_points: 500, compteur: 1},
												  {name: 'Black medecin', code: 'MEDECIN', number_of_points: 500, compteur: 1},
												  {name: 'Black mitraiileur', code: 'MITRAILLEUR', number_of_points: 500, compteur: 1},
												  {name: 'Black demineur', code: 'DEMINEUR', number_of_points: 500, compteur: 1},
												  {name: 'Black radio', code: 'RADIO', number_of_points: 500, compteur: 1},
												  {name: 'Black sapeur', code: 'SAPEUR', number_of_points: 500, compteur: 1},

												  //red
												  {name: 'Red leader', code: 'leader rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red operateur', code: 'operateur rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red hacker', code: 'hacker rouge', number_of_points: 500, compteur: 1},
												  {name: 'Red medecin', code: 'MEDECIN ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red mitrailleur', code: 'MITRAILLEUR ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red demineur', code: 'DEMINEUR ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red radio', code: 'RADIO ROUGE', number_of_points: 500, compteur: 1},
												  {name: 'Red sapeur', code: 'SAPEUR ROUGE', number_of_points: 500, compteur: 1}
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

function _load4x4(socket) {
    Player.remove({}, () => {
	Goal.remove({}, () => {
	    Player.remove({}, () => {
		Team.remove({}, () => {
		    Party.remove(() => {
			Party.create({name: "4x4", started: true}, (err, party) => {
			    Player.create({name: 'aleader', role: 'Leader', password: 'leader'},
					  {name: 'aradio', role: 'Radio', password: 'radio'},
					  {name: 'ahacker', role: 'Hacker', password: 'hacker'},
					  {name: 'acharoniard', role: 'Charoniard', password: 'charoniard'},

					  {name: 'bleader', role: 'Leader', password: 'leader'},
					  {name: 'bradio', role: 'Radio', password: 'radio'},
					  {name: 'bhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'bcharoniard', role: 'Charoniard', password: 'charoniard'},

					  {name: 'cleader', role: 'Leader', password: 'leader'},
					  {name: 'cradio', role: 'Radio', password: 'radio'},
					  {name: 'chacker', role: 'Hacker', password: 'hacker'},
					  {name: 'ccharoniard', role: 'Charoniard', password: 'charoniard'},

					  {name: 'dleader', role: 'Leader', password: 'leader'},
					  {name: 'dradio', role: 'Radio', password: 'radio'},
					  {name: 'dhacker', role: 'Hacker', password: 'hacker'},
					  {name: 'dcharoniard', role: 'Charoniard', password: 'charoniard'},

					  (err, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16) => {
					      Team.create({name: "Alpha",
							   user_list: [p1._id, p2._id, p3._id, p4._id], party_id: party._id}, 
							  {name: "Bravo",
							   user_list: [p5._id, p6._id, p7._id, p8._id], party_id: party._id},
							  {name: "Charlie",
							   user_list: [p9._id, p10._id, p11._id, p12._id], party_id: party._id},
							  {name: "Delta",
							   user_list: [p13._id, p14._id, p15._id, p16._id], party_id: party._id},
							  (err, t1, t2, t3, t4) => {
							      
							      Player.addToTeam(p1._id, t1._id, ()=>{
								  Player.addToTeam(p2._id, t1._id, ()=>{
								      Player.addToTeam(p3._id, t1._id, ()=>{
									  Player.addToTeam(p4._id, t1._id, ()=>{
									      
									      Player.addToTeam(p5._id, t2._id, ()=>{
										  Player.addToTeam(p6._id, t2._id, ()=>{
										      Player.addToTeam(p7._id, t2._id, ()=>{
											  Player.addToTeam(p8._id, t2._id, ()=>{
											      
											      Player.addToTeam(p9._id, t3._id, ()=>{
												  Player.addToTeam(p10._id, t3._id, ()=>{
												      Player.addToTeam(p11._id, t3._id, ()=>{
													  Player.addToTeam(p12._id, t3._id, ()=>{
													      
											      		      Player.addToTeam(p13._id, t4._id, ()=>{
														  Player.addToTeam(p14._id, t4._id, ()=>{
														      Player.addToTeam(p15._id, t4._id, ()=>{
															  Player.addToTeam(p16._id, t4._id, ()=>{
															      
															      Goal.create(
																  //secteur V
																  {name: '1.1', code: 'http://opn.to/a/YCRyZ', number_of_points: 1000, compteur: 1},
																  {name: '1.2', code: 'http://opn.to/a/qJ2F7', number_of_points: 1000, compteur: 1},
																  {name: '1.3', code: 'http://opn.to/a/3gUoR', number_of_points: 1000, compteur: 1},
																  {name: '1.4', code: 'http://opn.to/a/qkcfN', number_of_points: 1000, compteur: 1},
																  {name: '1.5', code: 'http://opn.to/a/MZzMy', number_of_points: 1000, compteur: 1},
																  {name: '1.6', code: 'http://opn.to/a/sVqEd', number_of_points: 1000, compteur: 1},

																  //zero
																  {name: '2.1', code: 'http://opn.to/a/K5azV', number_of_points: 1000, compteur: 1},
																  {name: '2.2', code: 'http://opn.to/a/6kodj', number_of_points: 1000, compteur: 1},
																  {name: '2.3', code: 'http://opn.to/a/gB20h', number_of_points: 1000, compteur: 1},
																  {name: '2.4', code: 'http://opn.to/a/99tV3', number_of_points: 1000, compteur: 1},
																  {name: '2.5', code: 'http://opn.to/a/NVEZr', number_of_points: 1000, compteur: 1},
																  {name: '2.6', code: 'http://opn.to/a/54B8q', number_of_points: 1000, compteur: 1},
																  {name: '2.7', code: 'http://opn.to/a/ROM0k', number_of_points: 1000, compteur: 1},
																  {name: '2.8', code: 'http://www.qrstuff.com/', number_of_points: 1000, compteur: 1},
																  
																  //camps mili
																  {name: '3.1', code: 'http://zh.wikipedia.org/', number_of_points: 1000, compteur: 1},
																  {name: '3.2', code: 'It\'s great! Your app works!', number_of_points: 1000, compteur: 1},
																  {name: '3.3', code: 'http://virginieberger.com', number_of_points: 1000, compteur: 1},
																  {name: '3.4', code: 'Bienvenue sur Unitag.fr !', number_of_points: 1000, compteur: 1},
																  {name: '3.5', code: 'http://www.qrstuff.com', number_of_points: 1000, compteur: 1},
																  {name: '3.6', code: 'http://bit.ly/GiraDischi', number_of_points: 1000, compteur: 1},

																  //lost
																  {name: '4.1', code: 'http://opn.to/a/k9o7h', number_of_points: 1000, compteur: 1},
																  {name: '4.2', code: 'https://goo.gl/HzULC2', number_of_points: 1000, compteur: 1},
																  {name: '4.3', code: 'Scanner', number_of_points: 1000, compteur: 1},

																  //fort
																  {name: '5.1', code: 'La réduction 15% sur n’importe quel pack premium ! Utilisez le code de réduction : QRCODE', number_of_points: 1000, compteur: 1},
																  {name: '5.2', code: 'http://mathematica.stackexchange.com/', number_of_points: 1000, compteur: 1},
																  {name: '5.3', code: '"There is never a good enough reason to justify a QR Code." - Scott Hanselman', number_of_points: 1000, compteur: 1},
																  {name: '5.4', code: 'a', number_of_points: 1000, compteur: 1},
																  {name: '5.5', code: 'http://adafru.it/qr', number_of_points: 1000, compteur: 1},
																  {name: '5.6', code: 'https://www.quora.com/What-is-my-QR-code/answer/Joel-Postman', number_of_points: 1000, compteur: 1},
																  {name: '5.7', code: 'no fee ATM', number_of_points: 1000, compteur: 1},
																  {name: '5.8', code: 'http://fr.wikipedia.org/', number_of_points: 1000, compteur: 1},
																  {name: '5.9', code: 'YKART', number_of_points: 1000, compteur: 1},

																  //black
																  {name: 'Black leader', code: 'operateur bleu', number_of_points: 500, compteur: 1},
																  {name: 'Black operateur', code: 'leader bleu', number_of_points: 500, compteur: 1},
																  {name: 'Black hacker', code: 'hacker bleu', number_of_points: 500, compteur: 1},
																  {name: 'Black medecin', code: 'MEDECIN', number_of_points: 500, compteur: 1},
																  {name: 'Black mitraiileur', code: 'MITRAILLEUR', number_of_points: 500, compteur: 1},
																  {name: 'Black demineur', code: 'DEMINEUR', number_of_points: 500, compteur: 1},
																  {name: 'Black radio', code: 'RADIO', number_of_points: 500, compteur: 1},
																  {name: 'Black sapeur', code: 'SAPEUR', number_of_points: 500, compteur: 1},

																  //red
																  {name: 'Red leader', code: 'leader rouge', number_of_points: 500, compteur: 1},
																  {name: 'Red operateur', code: 'operateur rouge', number_of_points: 500, compteur: 1},
																  {name: 'Red hacker', code: 'hacker rouge', number_of_points: 500, compteur: 1},
																  {name: 'Red medecin', code: 'MEDECIN ROUGE', number_of_points: 500, compteur: 1},
																  {name: 'Red mitrailleur', code: 'MITRAILLEUR ROUGE', number_of_points: 500, compteur: 1},
																  {name: 'Red demineur', code: 'DEMINEUR ROUGE', number_of_points: 500, compteur: 1},
																  {name: 'Red radio', code: 'RADIO ROUGE', number_of_points: 500, compteur: 1},
																  {name: 'Red sapeur', code: 'SAPEUR ROUGE', number_of_points: 500, compteur: 1}
																  , (err) => {
																      RGProps.set_active_template('4x4');
																      socket.emit('get_active_template', '4x4');
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
