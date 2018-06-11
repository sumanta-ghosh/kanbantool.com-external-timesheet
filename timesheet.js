(function () {
var css, _this = this, popup,updateTask, updateTasks,
        css = "#custom-time-tracking-tools{display:none;position:fixed;left:0;right:0;bottom:0;top:0;width:100%;background-color:rgba(0,0,0,.5);z-index:9999;opacity:1}.time-sheet-custom{background-color:#fff;display:block;width:645px;margin:20px auto;font-size:13px;border-radius:3px;position:static;left:50%;top:10%;z-index:200}.time-sheet-custom>form{box-shadow:0 13px 25px 0 rgba(0,0,0,.3);position:relative}.time-sheet-custom>form .kt-taskview-title{z-index:200;border-radius:3px 3px 0 0;padding:10px 10px 5px;background:#03a9f4;color:#fff}#close-custom-timesheet-popup{color:#fff;font-size:26px;position:absolute;top:0;right:1px}.time-sheet-custom h1{line-height:20px;font-size:20px}.time-sheet-custom>form .kt-taskview-content>ul{padding:10px 20px;line-height:1.4em;clear:both}.time-sheet-custom>form .kt-taskview-content>ul>li{box-sizing:border-box;position:relative;margin:0;display:inline-block;float:left;word-break:normal;word-wrap:break-word;padding-right:5px}.time-sheet-custom>form .kt-taskview-footer{padding:5px 10px;background:#f5f5f5;border-radius:0 0 5px 5px;overflow:hidden}.time-sheet-custom>form btn.btn-primary{float:right}.time-sheet-custom>form .kt-taskview-content>ul>li label{display:inline-block;margin-right:10px;width:100px}.time-sheet-custom>form .kt-taskview-content{z-index:0;background:#fff;position:relative;display:inline-block;margin-top:5px}.time-sheet-custom>form .progress {height:5px;top:35px;border-radius:0;margin-bottom:0;position:absolute;width:100%;display:none;}input.iw-error,input.iw-error:focus{border: 1px solid red;}";
        popup = `<div id="custom-time-tracking-tools">
                    <div class="time-sheet-custom">
                        <form id="iw_custom_taimesheet_form" class="kt-taskview--unsaved">
                            <div class="kt-taskview-title">
                                <a href="#" id="close-custom-timesheet-popup"><i class="kt-icon-cancel-1"></i></a>
                                <h1>Add Time</h1>
                            </div>
                            <div id="iw_progress_bar" class="kt-taskview-loading_progress progress progress-striped active" style="display: none;">
                                <div class="bar" style="width: 100%;"></div>
                            </div>
                            <div class="kt-taskview-content"> 
                                <ul>
                                    <li>
                                        <label>Project ID:</label><input type="text" readonly value="" id="iw_project_id" name="project" placeholder="Project"/>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <label>Project Name:</label><input type="text" readonly value="" id="iw_project_name" name="iw_project_name" placeholder="Project"/>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <label>Task ID:</label><input type="text" readonly id="iw_task_id" value="" name="id_task_id" placeholder="ID"/>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <label>Task Name:</label><input readonly  type="text" id="iw_task_name" value="" name="iw_task_name" placeholder="Task Name"/>
                                    </li>
                                </ul>                                
                                <ul>
                                    <li>
                                        <label>Assigned user:</label><input type="text" id="iw_assigned_user" value="" name="iw_assigned_user" placeholder="Assigned to"/>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <label>Comments:</label><textarea id="iw_task_comments" name="iw_task_comments"></textarea>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <label>Time:</label><input type="text" id="iw_time" value="" name="iw_time" placeholder=""/>
                                    </li>
                                </ul>
                            </div>
                            <div class="kt-taskview-footer">
                                <button style="float:right" id="iw_submit_form" class="btn btn-primary" title="Ctrl + Enter">Add</button>
                            </div>
                        </form>
                    </div>
                </div>`;
        $('<style>').html(css).appendTo('head');
        $('<div>').html(popup).appendTo('body');
        $("#close-custom-timesheet-popup").on('click', function (e) {
            $("#custom-time-tracking-tools").hide();
            e.preventDefault();
            if($.browser.msie){
                e.cancelBubble=true;
            }else{
                e.stopPropagation();
            }
        });
    var css,custom_timesheet;
    css = ".custom_timesheet { font-size: 0.9em; }";
    $('<style>').html(css).appendTo('head');
    KT.Elements.Task.header.unshift({
      __: 'CTime',
      filter:function(task){
          return task.props.task.attributes.external_id !== null && task.props.task.attributes.external_id.startsWith('#');
      },
      html: function(el, task) {
        return '<span data-id="'+task.attributes.id+'" class="custom_timesheet kt-task--prevent_click"><i class="kt-icon-clock"></i></span>';
      }
    });
    $(document).on('click','.custom_timesheet',function(e){
        var data = $(this).data(),description,iw_assigned_user='NA';
        var task = window.KT.boards.models[0].tasks().filter(function(task){
                return task.attributes.id === data.id;
              })
        if(task[0].attributes.assigned_user_id !== null){
            iw_assigned_user = task[0].attributes.assigned_user.name;            
        }
        $("#custom-time-tracking-tools").show();
        $("#iw_project_id").val(task[0].attributes.board_id);
        $("#iw_project_name").val($(".brand").find('span').text());
        $("#iw_task_id").val(task[0].attributes.external_id);
        $("#iw_task_name").val(task[0].attributes.name);
        $("#iw_assigned_user").val(iw_assigned_user);
        $("#iw_task_comments").val('').focus();
        $("#iw_time").val('');
        if($.browser.msie){
            e.cancelBubble=true;
        }else{
            e.stopPropagation();
        }
    })
    var $form = $('#iw_custom_taimesheet_form'),
    url = 'https://script.google.com/macros/s/AKfycbx0Vmy7ciLHVwzYF9VgtGpBBRydtzd84eITwhG4F8a7A_ly3vpL/exec'
    $(document).on('submit','#iw_custom_taimesheet_form',function(e){
        $("#iw_time").removeClass('iw-error');
        e.preventDefault();
        if($("#iw_time").val()==''){
            $("#iw_time").addClass('iw-error').focus();
        }else{
        $("#iw_submit_form").addClass('disabled');
        $("#iw_progress_bar").show();
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: $form.serialize()
          }).success(function(){              
            $("#iw_progress_bar").hide();
            $("#close-custom-timesheet-popup").trigger('click');
          }).always(function(){
              $("#iw_submit_form").removeClass('disabled');
          });
      }
    })
}).call(this);