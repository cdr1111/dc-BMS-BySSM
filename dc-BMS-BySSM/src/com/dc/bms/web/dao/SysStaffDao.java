/*
 * SysStaffDao.java
 * Copyright(C) 2016 dc com.dc��˾
 * All rights reserved.
 * --------------------------------------------
 * 2016-05-20 Created
 */
package com.dc.bms.web.dao;

import com.dc.bms.web.domain.SysStaff;

public interface SysStaffDao {
    int deleteById(Long id);

    int insert(SysStaff record);

    SysStaff selectById(Long id);

    int updateById(SysStaff record);
}