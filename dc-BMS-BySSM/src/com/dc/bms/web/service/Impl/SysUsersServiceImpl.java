package com.dc.bms.web.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.dc.bms.web.dao.SysUsersDao;
import com.dc.bms.web.domain.Account;
import com.dc.bms.web.domain.SysUsers;
import com.dc.bms.web.service.ISysUsersService;

public class SysUsersServiceImpl implements ISysUsersService {

	@Autowired
	private SysUsersDao sysUsersDao;
	
	@Override
	public int deleteById(Long id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(SysUsers record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public SysUsers selectById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateById(SysUsers record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Account getAccountByLoginName(String loginName) {
		Account ac = sysUsersDao.getAccountByLoginName(loginName);
		return ac;
	}

}
