<?php

namespace DTRE\OeilSiteBundle\Controller;

use DTRE\OeilSiteBundle\Entity\ApiUser;
use DTRE\OeilSiteBundle\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);
        return $this->render('DTREOeilSiteBundle:Default:index.html.twig', array(
            'token'=>$user->getApiToken(),
            'login'=>$user->getEmail(),
            'apiid'=>$user->getApiId(),
            'form'=>$form->createView()
        ));
    }

    public function chatAction()
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);
        return $this->render('DTREOeilSiteBundle:Default:chat.html.twig', array(
            'token'=>$user->getApiToken(),
            'login'=>$user->getEmail(),
            'apiid'=>$user->getApiId(),
            'form'=>$form->createView()
        ));
    }

    public function videoAction()
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);

        return $this->render('DTREOeilSiteBundle:Default:video.html.twig', array(
            'token'=>$user->getApiToken(),
            'login'=>$user->getEmail(),
            'apiid'=>$user->getApiId(),
            'form'=>$form->createView()
        ));
    }

    public function mediaAction()
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);

        return $this->render('DTREOeilSiteBundle:Default:media.html.twig', array(
            'token'=>$user->getApiToken(),
            'login'=>$user->getEmail(),
            'form'=>$form->createView()
        ));
    }

    public function apiAction(Request $request)
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);

        return $this->render('DTREOeilSiteBundle:Default:api.html.twig', array(
            'user'=>$user,
            'form'=>$form->createView()
        ));
    }

    public function apitokenAction(Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new BadRequestHttpException('Only ajax accepted');
        }
        if ($request->isMethod('POST') && $request->request->has('token')) {
            $em = $this->getDoctrine()->getManager();
            $user = $this->getUser();
            $user->setApiToken($request->request->get('token'));
            $em->persist($user);
            $em->flush();
            return new JsonResponse(array(
                'status' => 'ok',
            ));
        } else {
            throw new BadRequestHttpException('No token in request');
        }
    }

    public function apiIdAction(Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new BadRequestHttpException('Only ajax accepted');
        }
        if ($request->isMethod('POST') && $request->request->has('id')) {
            $em = $this->getDoctrine()->getManager();
            $user = $this->getUser();
            //if ($user->getApiId()==0){
                $user->setApiId($request->request->get('id'));
                $em->persist($user);
                $em->flush();
                return new JsonResponse(array(
                    'status' => 'ok',
                    'api id' => 'ok'
                ));
            //}
        } else {
            throw new BadRequestHttpException('No token in request');
        }
    }

    public function graphicsAction()
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);

        return $this->render('DTREOeilSiteBundle:Default:graphics.html.twig', array(
            'token'=>$user->getApiToken(),
            'login'=>$user->getEmail(),
            'form'=>$form->createView()
        ));
    }
}
