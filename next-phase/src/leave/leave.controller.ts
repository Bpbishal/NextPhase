  import {Controller,Post,Body,Delete,Param,UseGuards,Get,Request,ParseIntPipe,} from '@nestjs/common';
  import { LeaveService } from './leave.service';
  import { CreateLeaveDto } from './dto/create-leave.dto';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('leave')
  export class LeaveController {
    constructor(private readonly leaveService: LeaveService) {}
  
    @Post()
    apply(@Request() req, @Body() dto: CreateLeaveDto) {
      return this.leaveService.applyForLeave(req.user, dto);
    }
  
    @Get('my-leaves')
    getMyLeaves(@Request() req) {
      return this.leaveService.getMyLeaves(req.user);
    }
  
    @Delete(':id')
    delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
      return this.leaveService.deleteLeave(req.user, id);
    }
  
    @Get('balance')
    getBalance(@Request() req) {
      return this.leaveService.getLeaveBalance(req.user);
    }
  }
  