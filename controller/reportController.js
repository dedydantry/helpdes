var exports = module.exports = {}
const Ticket = require('../model/ticket');
const Rating = require('../model/rating');
const User = require('../model/user');
let moment = require('moment');
const now = moment().format('YYYY-MM-DD')
const month = moment().format('YYYY-MM')
exports.index = async(req,res) => {
    console.log(now)
    let total = await Ticket.count('id_ticket');
    let today = await Ticket.where('crated_at', 'like', now+'%').count('id_ticket');
    let complete = await Ticket.where('status', 1).count();
    let pending = await Ticket.where('status', 2).count();
    let open = await Ticket.where('status', 0).count();
    let thismont = await Ticket.where('crated_at', 'like', month+'%').count('id_ticket');
    
    return res.render('report/index', {
        total : total, 
        today : today, 
        complete:complete,
        pending : pending,
        open : open,
        thismont : thismont
    });
}

exports.technician = async(req, res) => {
    try {
        let rate = await Rating.query(function(qb){
            qb.select('rating.*')
            qb.sum('rating.rate as total')
            qb.count('user_id as jumlah')
            qb.groupBy('rating.user_id')
        }).fetchAll({withRelated: ['user']});
        return res.render('report/operator',{
            'rate' : rate.toJSON()
        });
    } catch (error) {
        return res.send(error)
    }
}

exports.details = async(req, res) => {
    let users = await  User.where('id_users', req.params.user_id).fetch();
    let rate = await Rating.where(req.params).fetchAll({withRelated:['ticket']});
    return res.render('report/details', {
        rate:rate.toJSON(),
        owner : users.toJSON()
    });
}

exports.views = async(req, res) => {
    var from = req.query.from;
    var to = req.query.to;
    var type = req.query.type;
    let view = await Ticket.query(function(qb){
        qb.whereBetween('crated_at', [from, to]);
        qb.where('status', type);
    }).fetchAll({withRelated: ['user']});

    if(type == 3){
        view = await Ticket.query(function(qb){
            qb.whereBetween('crated_at', [from, to]);
        }).fetchAll({withRelated: ['user']});
    }
   return res.render('report/view', {report : view.toJSON(),  types:type, from :from, to:to});
}


// print report
exports.printperiode = async(req, res) => {
    var from = req.query.from;
    var to = req.query.to;
    var type = req.query.type;
    let title = 'Periode '+moment(from).format("ll")+' - '+moment(to).format("ll")
    let view = await Ticket.query(function(qb){
        qb.whereBetween('crated_at', [from, to]);
        qb.where('status', type);
    }).fetchAll({withRelated: ['user']});

    if(type == 3){
        view = await Ticket.query(function(qb){
            qb.whereBetween('crated_at', [from, to]);
        }).fetchAll({withRelated: ['user']});
    }
   return res.render('export/periode', {report : view.toJSON(), title:title, from :from, to:to});
}

exports.printoperator = async(req, res) => {
    let rate = await Rating.query(function(qb){
        qb.select('rating.*')
        qb.sum('rating.rate as total')
        qb.count('user_id as jumlah')
        qb.groupBy('rating.user_id')
    }).fetchAll({withRelated: ['user']});
    return res.render('export/technician',{
        'rate' : rate.toJSON(),
        'title' : 'Technician Report'
    });
}

exports.printdetails = async(req, res) => {
    let users = await  User.where('id_users', req.params.user_id).fetch();
    let rate = await Rating.where(req.params).fetchAll({withRelated:['ticket']});
    return res.render('export/details', {
        rate:rate.toJSON(),
        owner : users.toJSON(),
    });
}

exports.ticketstatus = async(req, res) => {
    let status = req.query.status;
    let periode = req.query.periode;
    if(!periode){
        periode = moment().format('MM-YYYY');
    }
    var dates = '01'+periode.replace('-', '');
    let ticket = await Ticket.where({'status' :status }).query(function(qb){
        qb.whereRaw('DATE_FORMAT(crated_at, "%m-%Y") = "'+periode+'"')
    }).fetchAll({withRelated:['user']});
    return res.render('report/ticketstatus', {
        'ticket' : ticket.toJSON(),
        'title' : status,
        'dates' : moment(dates, 'DDMMYYYY').format('MMMM YYYY'),
        'periode' : periode
    });
}

exports.ticketstatusprint = async(req, res) => {
    let status = req.query.status;
    let periode = req.query.periode;
    if(!periode){
        periode = moment().format('MM-YYYY');
    }
    var dates = '01'+periode.replace('-', '');
    let ticket = await Ticket.where({'status' :status }).query(function(qb){
        qb.whereRaw('DATE_FORMAT(crated_at, "%m-%Y") = "'+periode+'"')
    }).fetchAll({withRelated:['user']});
    return res.render('export/ticketstatus', {
        'ticket' : ticket.toJSON(),
        'title' : status,
        'dates' : moment(dates, 'DDMMYYYY').format('MMMM YYYY'),
        'periode' : periode
    });
}

exports.daily = async(req, res) => {
    let ticket = await Ticket.where('crated_at', 'like', now + '%').fetchAll({withRelated : ['user']});

    return res.render('report/daily', {ticket : ticket.toJSON()});
}

exports.printdaily = async(req, res) => {
    let ticket = await Ticket.where('crated_at', 'like', now + '%').fetchAll({withRelated : ['user']});
    let title = moment().format('LL');   
    return res.render('export/daily', {ticket : ticket.toJSON(), title : title});
}

exports.users = async(req, res) =>{
    let ticket = await Ticket.query(qb => {
        qb.select('*')
        qb.count('id_ticket as jumlah');
        qb.groupBy('owner');
    }).fetchAll({withRelated : ['user']})

    return res.render('report/users', {ticket : ticket.toJSON()});
}

exports.printuser = async(req, res) => {
    let ticket = await Ticket.query(qb => {
        qb.select('*')
        qb.count('id_ticket as jumlah');
        qb.groupBy('owner');
    }).fetchAll({ withRelated: ['user'] })

    return res.render('export/users', { ticket: ticket.toJSON(), title : 'Report By Users' });
}

exports.userdetail = async(req, res) => {
    let user = await User.where('id_users', req.params.owner).fetch()
    let ticket = await Ticket.where('owner', req.params.owner).fetchAll();
    
    return res.render('report/userdetail', { ticket: ticket.toJSON(), owner: user.toJSON()});
}

exports.printuserdetail = async(req, res) => {
    let user = await User.where('id_users', req.params.owner).fetch()
    let ticket = await Ticket.where('owner', req.params.owner).fetchAll();

    return res.render('export/userdetail', { ticket: ticket.toJSON(), owner: user.toJSON() });
}

exports.montly = async(req, res) =>{
    let ticket = await Ticket.where('crated_at', 'like', month + '%').fetchAll({withRelated:['user']});
    return res.render('report/montly', {ticket : ticket.toJSON()});
}

exports.printmontly = async(req, res) => {
    let ticket = await Ticket.where('crated_at', 'like', month + '%').fetchAll({ withRelated: ['user'] });
    return res.render('export/montly', { ticket: ticket.toJSON(), periode: moment().format('MM-YYYY')});
}

exports.exportspdf =  async(req, res) => {
    var html = res.render('export/periode');
}

exports.excel = async(req, res) => {
    var excelbuilder = require('msexcel-builder');
      // Create a new workbook file in current working-path
  var workbook = excelbuilder.createWorkbook('./', 'sample.xlsx')
  
  // Create a new worksheet with 10 columns and 12 rows
  var sheet1 = workbook.createSheet('sheet1', 10, 12);
  
  // Fill some data
  sheet1.set(1, 1, 'I am title');
  for (var i = 2; i < 10; i++)
    sheet1.set(i, 2, 'test'+i);
    
  // Save it
  workbook.save(function(ok){
    if (!ok) 
      workbook.cancel();
    else
      console.log('congratulations, your workbook created');
  });
}